import React,{useEffect} from 'react';
import {Routes, Route} from "react-router-dom";
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
import './App.scss';


library.add(fab, far, fas)

function App() {
  useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v6.0.0/css/all.css'
    );

    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);
  return (
    <div className="App">
      <Header/>
      <Routes>
      <Route path="/"  element={<Home/>} />
      <Route path="/products"  element={<Product/>} />
      <Route path="/services"  element={<Service/>} />
      <Route path="/book-online"  element={<BookOnline/>} />
      <Route path="/contact"  element={<Contact/>} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
        <Footer/>
    </div>
  );
}

export default App;
