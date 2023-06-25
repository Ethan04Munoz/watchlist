import { useState } from 'react';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Agregar from './Paginas/Agregar';
import Inicio from './Paginas/Inicio';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route exact path="/agregar" element={<Agregar/>}/>
        <Route exact path="/" element={<Inicio/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
