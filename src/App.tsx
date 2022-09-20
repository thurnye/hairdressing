import React from 'react';
import {Routes, Route} from "react-router-dom";
import NoMatch from './pages/NoMatch/NoMatch';
import Home from './pages/Home/Home';
import Service from './pages/Service/Service';
import Product from './pages/Product/Product';
import BookOnline from './pages/BookOnline/BookOnline';
import Contact from './pages/Contact/Contact';
import './App.scss';
import Header from './components/Header/Header';

function App() {
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
    </div>
  );
}

export default App;
