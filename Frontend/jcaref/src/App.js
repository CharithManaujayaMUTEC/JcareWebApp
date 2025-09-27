import './App.css';
import Home from './Pages/Home';
import React from "react";
import Dashboard from './Pages/Dashboard';
import Patient from './Pages/PatientProfile';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import VisitorSchedule from './Pages/VisitorSchedule';
import UploadReport from './Pages/UploadReport';
import GoodsRequest from './Pages/GoodsRequest';
import AdminDashboard from './Pages/AdminDashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Dashboard" element={<Dashboard/>} />
          <Route path="/patient/:patientId" element={<Patient/>} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/schedula-a-visit" element={<VisitorSchedule />} />
          <Route path="/upload-report" element={<UploadReport />} />
          <Route path="/GoodsRequest" element={<GoodsRequest />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
