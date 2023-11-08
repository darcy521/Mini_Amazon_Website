import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Product from './components/Product';
import Category from './components/Category';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'

library.add(fas, faTwitter, faFontAwesome, fab); 

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch('/api')
    .then((res) => res.json())
    .then((data) => setData(data.message));
  }, []);
  
  return (
    <>
      <div className="app">
        <Header />
        <Category />
        {/* <div className="app-body">
          <p>{!data? "Loading..." : data}</p>
        </div> */}
        <Product />
        <Footer />
      </div>
    </>
  );
}

export default App;
