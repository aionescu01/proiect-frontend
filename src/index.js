import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import './index.css';

import { Anvelope } from './Anvelope';
import HotelAnvelope  from './HotelAnvelope';

import AddAnvelope from './Controlere/Crud_Anvelope/Add_Anvelope'
import AddHotelAnvelope from './Controlere/Crud_Hotel_Anvelope/Add_Hotel_Anvelope'

import UpdateAnvelope from './Controlere/Crud_Anvelope/Update_Anvelope';
import UpdateHotelAnvelope from './Controlere/Crud_Hotel_Anvelope/Update_Hotel_Anvelope'

import Navigation  from "./Controlere/Navigation";
import Home from "./Controlere/Home";
import Auth from './Auth';

import 'bootstrap/dist/css/bootstrap.min.css';



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    
    <Navigation />

    <Routes>

      {/* Ruta pentru pagina de Home */}
      <Route path="/" element={<Home />} />

      {/* Ruta pentru pagina de Autentificare */}
      <Route path="/toauth" element={<Auth />} />

      {/* Ruta pentru pagina de Jucatori */}
      <Route path="/toanvelope" element={<Anvelope />} />
      <Route path="/update_anvelopa" element={<UpdateAnvelope />} />
      <Route path="/add_anvelopa" element={<AddAnvelope />} />

       {/* Ruta pentru pagina de Contracte */}
       <Route path="/tohotel" element={< HotelAnvelope />} />
      <Route path="/update_hotel_anvelope" element={<UpdateHotelAnvelope />} />
      <Route path="/add_hotel_anvelopa" element={<AddHotelAnvelope />} />

      {/* Ruta default */}
      <Route path="*" element={<Navigate to="/" />} />
      
    </Routes>

  </Router>
);
