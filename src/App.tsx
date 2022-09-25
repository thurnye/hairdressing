import React from 'react';
import {Routes, Route} from "react-router-dom";
import NoMatch from './pages/NoMatch/NoMatch';
import Home from './pages/Home/Home';
import Service from './pages/Service/Service';
import Product from './pages/Product/Product';
import BookOnline from './pages/BookOnline/BookOnline';
import Contact from './pages/Contact/Contact';
import Header from './components/Header/Header';
import Container from '@mui/material/Container';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header/>
      {/* <Container maxWidth="lg"> */}
      <Routes>
      <Route path="/"  element={<Home/>} />
      <Route path="/products"  element={<Product/>} />
      <Route path="/services"  element={<Service/>} />
      <Route path="/book-online"  element={<BookOnline/>} />
      <Route path="/contact"  element={<Contact/>} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
        {/* </Container> */}

    </div>
  );
}

export default App;
