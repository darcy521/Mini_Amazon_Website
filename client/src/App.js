import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import ProductDetail from './pages/ProductDetail';
import Footer from './components/Footer';
import Header from './components/Header';
import CreateAccount from './pages/CreateAccount';
import ForgetPassword from './pages/ForgetPassword';

library.add(fas, faTwitter, faFontAwesome, fab); 

function App() {
  const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch('/api')
  //   .then((res) => res.json())
  //   .then((data) => setData(data.message));
  // }, []);
  
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/productdetail/:id' element={<ProductDetail />} />
          <Route path='/createaccount' element={<CreateAccount />} />
          <Route path='/forgetpassword' element={<ForgetPassword />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
