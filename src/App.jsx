import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import "./App.css";
import CustomerServicePage from "./pages/CustomerServicePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Navigate to="/login" replace={true} />} />
      <Route exact path="/login" element={<LoginPage />} />
      <Route exact path="/register" element={<RegisterPage />} />
      <Route exact path="/clientsService" element={<CustomerServicePage />} />
    </Routes>
  );
}

export default App;
