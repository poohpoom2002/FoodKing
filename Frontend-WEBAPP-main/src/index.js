import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Navbar from './components/Nav/NavBar';
import './index.css';
import Home from './pages/Home/Home';
import About from './pages/AboutUs/About';
import PageNotFound from './pages/404/PageNotFound';
import OrderPage from './pages/OrderPage/OrderPage';
import OrderInCanteen from './pages/OrderCanteen/OrderInCanteen';
import SelectLocation from './pages/SelectLocation/SelectLocation';
import Pickupall from './pages/Pickup/Pickupall';
import Pickuppage from './pages/PickupPage/PickupPage';

const root = ReactDOM.createRoot(document.getElementById('root'),(document.title = 'Food King'));
root.render(
  <BrowserRouter>
    <Navbar content = {
        <div style={{width:"100%",height:'100%'}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="OrderInCanteen/:canId" element={<OrderInCanteen />} />
            <Route path="Pickupall/:canId" element={<Pickupall />} />
            <Route path="/select" element={<SelectLocation/>} />
            <Route path="/order/:canId" element={<OrderPage />} />
            <Route path="/order/:canteen" element={<OrderPage />} />
            <Route path="/Pickuppage" element={<Pickuppage />} />
          </Routes>
        </div>
    }/>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
