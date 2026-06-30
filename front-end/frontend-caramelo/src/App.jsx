import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css'
import Home from "./home";
import Welcome from "./welcome";
import About from './About';
import Account from './Account';
import Card from './Card';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
