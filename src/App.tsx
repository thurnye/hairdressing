import React,{useEffect, useState} from 'react';
import {Routes, Route, redirect} from "react-router-dom";
import jwt_decode from "jwt-decode";

import {useDispatch, useSelector} from 'react-redux';
import { loadCSS } from 'fg-loadcss';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import {fas} from '@fortawesome/free-solid-svg-icons'
import NoMatch from './pages/NoMatch/NoMatch';
import Home from './pages/Home/Home';
import Service from './pages/Service/Service';
import Product from './pages/Product/Product';
import BookOnline from './pages/BookOnline/BookOnline';
import Contact from './pages/Contact/Contact';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { getCategories } from './api/request'; 
import { getAllCategories} from './store/categorySlice';
import { getAllBrands} from './store/productSlice';
import './App.scss';
import Signup from './components/Auth/Signup/Signup';
import { login, userSelector } from './store/userSlice';


library.add(fab, far, fas)

function App() {
  const dispatch = useDispatch();
  const user = useSelector(userSelector)
  let token = localStorage.getItem('token')
  useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v6.0.0/css/all.css'
    );

    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);
  useEffect(() => { 
    const fetchData = async () => {
      const request = await getCategories()
      const {status} = request
      const {categories, brands} = request && request.data
        dispatch(getAllCategories({status,categories}))
        dispatch(getAllBrands({status,brands}))
  }
  fetchData();
  },[])

  useEffect(() => {
    if (token) {
      const user:any = jwt_decode(token); 
      dispatch(login(user))
    }
  }, [token, dispatch])


  return (
    <div className="App">
      <Header/>
      <Routes>
      <Route path="/"  element={<Home/>} />
      {
        !user && <>
          <Route path="/login"  element={<Signup login={true}/>} />
          <Route path="/signup"  element={<Signup login={false}/>} />
        </>
      }
      <Route path={`/products/search/:searchText`}  element={<Product/>} />
      <Route path={`/products/filter`}  element={<Product/>} />
      <Route path="/services"  element={<Service/>} />
      <Route path="/book-online"  element={<BookOnline/>} />
      <Route path={`/products/:categoryID`} element={<Product/>} />
      <Route path="/contact"  element={<Contact/>} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
        <Footer/>
    </div>
  );
}

export default App;
