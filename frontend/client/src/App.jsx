import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Body from './components/Body';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/UserProfile';
import Account from './components/Account';
import Shipment from './components/Shipment';
import Admin from './components/Admin';
import AdminLogin from './components/AdminLogin';
import AdminSignup from './components/AdminSignup';
import AdminProfile from './components/AdminProfile';
import TruckLoader from './components/TruckLoader';
import ManageShipments from './components/ManageShipments';
import TrackShipment from './components/TrackShipment';
import Enquiry from './components/Equiry'

const App = () => {
  const [appLoading, setAppLoading] = useState(true);
  // const [fadeOut,setFadeout] = useState(false)

  useEffect(() => {
    
    const timer = setTimeout(() =>{ 
      // setFadeout(true)
      setAppLoading(false)}, 3000); 
    return () => clearTimeout(timer);
  }, []);

  if (appLoading) {
    return (
      <div className={`flex flex-col gap-3 fixed top-0 left-0 w-full h-full bg-blue-500 items-center justify-center z-50 transition-opacity duration-1000`}>
        <div>{<TruckLoader/>}</div>
        <div className='text-center text-white font-serif text-xl tracking-wide'>Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/about' element={<About />} /> */}
        <Route path='/whatwedo' element={<Body />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/enquiry' element={<Enquiry />} />
        <Route path='/account' element={<Account />} />
        <Route path='/shipment' element={<Shipment />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/adminlogin' element={<AdminLogin />} />
        <Route path='/adminsignup' element={<AdminSignup />} />
        <Route path='/adminprofile' element={<AdminProfile />} />
        <Route path='/tracker' element={<TrackShipment/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
