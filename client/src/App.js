import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import home from './pages/home';
import signIn from './pages/signIn';
import productDetail from './pages/productDetail';

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
          <Route path='/' Component={ home } />
          <Route path='/signin' Component={ signIn } />
          <Route path='./productdetail/:id' Component={ productDetail } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
