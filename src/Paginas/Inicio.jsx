import React from 'react';
import { useState } from 'react';
import Boton from '../componentes/Boton';
import { useNavigate } from 'react-router';
import './estilosComunes.css';
import { useEffect } from 'react';

function Inicio(){
  const redirigir = useNavigate();
  const [watchlist, setWatchlist] = useState([]);

  function añadirPelicula(event){
    event.preventDefault();
    redirigir("./agregar");
  }

  useEffect(() => {
    // Obtener la watchlist del local storage al cargar la página
    const watchlistGuardada = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(watchlistGuardada);
  }, []);

  function eliminarPelicula(id) {
    // Filtrar la watchlist para eliminar la película con el ID correspondiente
    const watchlistActualizada = watchlist.filter((pelicula) => pelicula.id !== id);
    setWatchlist(watchlistActualizada);
    localStorage.setItem('watchlist', JSON.stringify(watchlistActualizada));
  }
  
    return (
      <>
      <div className="centrar">
      <h1>
        Mi watchlist
      </h1>
      {watchlist.length > 0 ? (
          <table className="tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Película</th>
                <th>Plataforma</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((pelicula) => (
                <tr key={pelicula.id}>
                  <td>{pelicula.id}</td>
                  <td>{pelicula.pelicula}</td>
                  <td>{pelicula.plataforma}</td>
                  <td>
                    <Boton contenido="Ya ví esta pelicula" clase="Btn BtnGreen" onClick={() => eliminarPelicula(pelicula.id)}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="tablaEmpty">
            <p>No hay películas en tu watchlist</p>
          </div>
        )}
        <Boton contenido="Agregar pelicula" clase="Btn BtnDark" onClick={añadirPelicula}/>
      </div>
      </>
    )
}

export default Inicio;