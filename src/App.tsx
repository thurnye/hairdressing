import React,{useEffect} from 'react';
import {Routes, Route} from "react-router-dom";
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
import Container from '@mui/material/Container';
import Footer from './components/Footer/Footer';
import { getCategories } from './api/request'; 
import { getAllCategories, categoriesSelector } from './store/categorySlice';
import { searchTextSelector } from './store/searchSlice';
import './App.scss';


library.add(fab, far, fas)

function App() {
  const dispatch = useDispatch();
  const categories = useSelector(categoriesSelector)
  const searchQuery = useSelector(searchTextSelector)
  useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v6.0.0/css/all.css'
    );

    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);

  //GetCategories
  useEffect(() => { 
    const fetchData = async () => {
      const request = await getCategories()
      const {status, data} = request
        dispatch(getAllCategories({status,data}))
  }
  fetchData();
  },[])


  return (
    <div className="App">
      <Header/>
      <Routes>
      <Route path="/"  element={<Home/>} />
      <Route path={`/products/search/:searchText`}  element={<Product/>} />
      <Route path="/services"  element={<Service/>} />
      <Route path="/book-online"  element={<BookOnline/>} />
      {/* {categories && categories.map((el:any) => {
        const {displayName} = el
        const path = displayName.split(' ').join('')
        return( */}
      {/* <Route path={`/products/:id`} key={`routes-${el.displayName}`} element={<Product/>} /> */}
      <Route path={`/products/:categoryID`} element={<Product/>} />
       {/* )})} */}
      <Route path="/contact"  element={<Contact/>} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
        <Footer/>
    </div>
  );
}

export default App;
