import React from 'react';
import Product from '../components/Product';
import './pages.css';
import CallPython from '../components/CallPython';

export default function Home() {
  return (
    <div className="body-container">
        {/* <div className="app-body">
          <p>{!data? "Loading..." : data}</p>
        </div> */}
        <CallPython />
        <Product />
    </div>
  )
}
