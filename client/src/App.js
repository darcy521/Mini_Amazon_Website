import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import Home from './pages/home';
import SignIn from './pages/signIn';
import ProductDetail from './pages/productDetail';

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
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/productdetail/:id' element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
