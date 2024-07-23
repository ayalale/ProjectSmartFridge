import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Home from './components/home';
import Login from './components/login';
import Products from './components/products';
import Chat from './components/Chat';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/chat" element={<Chat />} /> 
        </Routes>
      </div>
    </Router>
  );
};
console.log("app register react");
export default App;