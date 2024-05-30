import React from 'react'
import ReactDOM from 'react-dom';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import './index.css';
import Login from './frontend/login';
import Home from './frontend/index';
export default function Index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/erp-admin" element={<Home/>}></Route>
        <Route path="/erp-admin-login" element={<Login/>}></Route>
        {/* <Route path="/ClientProfile/:clientId" element={<ClientProfile/>}></Route> */}
        {/* <Route path='/notification' element={<Notification/>}></Route> */}
        {/* 
        <Route path='/Register' element={<Registeration/>}></Route> */}
      </Routes>
    </BrowserRouter>
  )
}
ReactDOM.render(<Index />, document.getElementById('root'));