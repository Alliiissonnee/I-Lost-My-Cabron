import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css'
import Home from "./home";
import Welcome from "./welcome";
import About from './About';
import FormPerdu from './Formulaires/FormPerdu';
import FormTrouve from './Formulaires/FormTrouve';
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/about" element={<About/>} />
        <Route path="/formperdu" element={<FormPerdu/>} /> 
        <Route path="/formtrouve" element={<FormTrouve/>} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App;
