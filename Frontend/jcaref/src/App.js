import './App.css';
import Home from './Pages/Home';
import React from "react";
import Dashboard from './Pages/Dashboard';
import Patient from './Pages/PatientProfile';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Dashboard" element={<Dashboard/>} />
          <Route path="/Patient" element={<Patient/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
