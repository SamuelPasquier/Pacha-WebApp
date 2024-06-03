import React from 'react';
import { BrowserRouter, Routes, Route, Router} from 'react-router-dom';
import Conexion from './components/Conexion';
import Sensor from './components/Sensor';
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Conexion />} />
        <Route path="/medidas" element={<Sensor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
