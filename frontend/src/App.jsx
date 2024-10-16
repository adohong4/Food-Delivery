import React, { useState, useContext, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'

import { StoreContext } from './context/StoreContext'
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


const App = () => {

  const [showLogin, setShowLogin] = useState(false);

  const { token, setToken, url } = useContext(StoreContext);

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        try {
          const response = await axios.get(url + '/api/user/checkToken', {
            headers: { Authorization: token }
          });

          if (!response.data.success) {
            //if token is not valid or account is not exist, web'll sign out
            localStorage.removeItem("token");
            setToken("");
          }
        } catch (error) {
          // error handling (token is not valid)
          localStorage.removeItem("token");
          setToken("");
        }
      }
    };
    checkToken();
  }, [token, setToken]);


  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
        <Footer />
      </div>
    </>

  )
}

export default App


