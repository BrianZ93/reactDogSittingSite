import React from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/AAHome";
import Contactus from "./pages/AAContactus";
import Services from "./pages/AAServices";
import Sidebar from './components/Sidebar';
import Dashboard from "./pages/BBDashboard";
import Calendarx from "./pages/BBCalendar";


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" exact element={ <Home/> }></Route>
          <Route path="/contactus" element={ <Contactus/> }></Route>
          <Route path="/services" element={ <Services/> }></Route>
          <Route path="/dashboard" element={ <Dashboard/> }></Route>
          <Route path="/calendar" element={ <Calendarx/> }></Route>
        </Routes>
      </BrowserRouter>   
    </>
  );
}

export default App;