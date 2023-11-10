import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Product from '../components/Product';
import './pages.css';

export default function home() {
  return (
    <div className="home-container">
        <Header />
        {/* <div className="app-body">
          <p>{!data? "Loading..." : data}</p>
        </div> */}
        <Product />
        <Footer />
      </div>
  )
}
