import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css'
import Home from "./home";
import Welcome from "./welcome";
import About from './About';
import Register from './RegisterConnexion/Register';
import Login from './RegisterConnexion/Login';
import Guest from './RegisterConnexion/Guest';
import Admin from './RegisterConnexion/Admin';

import Account from './Account';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/guest" element={<Guest />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About/>} />
        <Route path="/account" element={<Account/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
