import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from './auth/AuthContext';

import Sidebar from './components/Sidebar'
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import EmployeeForm from './pages/EmployeeForm';
import Services from './pages/Services';
import Delear from './pages/Delear';
import LoginForm from './pages/Login';
import RegisterForm from './pages/Register';

const App: FunctionComponent = () => {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/addDealer" element={<EmployeeForm />} />
          <Route path="/dealers" element={<Delear />} />
          <Route path="/services" element={<Services />} />
          <Route path="/helpdesk" element={<Analytics />} />
        </Route>
      </Routes>
    </Router>
  );
};

const ProtectedRoutes: FunctionComponent = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
     <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/addDealer" element={<EmployeeForm />} />
      <Route path="/dealers" element={<Delear />} />
      <Route path="/services" element={<Services />} />
      <Route path="/helpdesk" element={<Analytics />} />
      </Routes>
    </>
  );
};

export default App;
