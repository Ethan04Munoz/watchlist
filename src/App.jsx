import './App.css';
import {HashRouter,Routes,Route} from "react-router-dom";
import Agregar from './Paginas/Agregar';
import Inicio from './Paginas/Inicio';

function App() {
  return (
    <>
      <HashRouter>
      <Routes>
        <Route exact path="/agregar" element={<Agregar/>}/>
        <Route exact path="/" element={<Inicio/>}/>
      </Routes>
      </HashRouter>
    </>
  );
}

export default App
