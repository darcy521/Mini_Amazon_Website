import React from 'react';
import Product from '../components/Product';
import './pages.css';

export default function Home() {
  return (
    <div className="home-container">
        {/* <div className="app-body">
          <p>{!data? "Loading..." : data}</p>
        </div> */}
        <Product />
      </div>
  )
}
