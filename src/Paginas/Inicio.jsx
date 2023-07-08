import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Boton from '../componentes/Boton';
import './estilosComunes.css';

function Inicio() {
  const redirigir = useNavigate();
  const [watchlist, setWatchlist] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  function añadirPelicula(event) {
    event.preventDefault();
    redirigir('./agregar');
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

  function ordenarPor(columna) {
    if (columna === sortBy) {
      // Si la columna actual es la misma, invertimos el orden
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Si es una columna diferente, establecemos la nueva columna y orden ascendente
      setSortBy(columna);
      setSortOrder('asc');
    }
  }

  const [estadoMostrarOcultar, setEstadoMostrarOcultar] = useState({
    id: 'ocultar',
    plataforma: 'ocultar',
  });

  function cambiarMostrarOcultar(columna) {
    setEstadoMostrarOcultar((estadoActual) => ({
      ...estadoActual,
      [columna]: estadoActual[columna] === 'ocultar' ? 'mostrar' : 'ocultar',
    }));
  }

  return (
    <>
      <div className="centrar">
        <h1>Mi watchlist</h1>
        {watchlist.length > 0 ? (
          <table className="tabla">
            <thead>
              <tr>
                <th onClick={() => ordenarPor('id')} className="cabecera" onMouseOver={() => cambiarMostrarOcultar('id')} onMouseOut={() => cambiarMostrarOcultar('id')}>
                  ID <span className={estadoMostrarOcultar.id}> ↑↓</span>
                </th>
                <th>Película</th>
                <th
                  onClick={() => ordenarPor('plataforma')}
                  className="cabecera"
                  onMouseOver={() => cambiarMostrarOcultar('plataforma')} 
                  onMouseOut={() => cambiarMostrarOcultar('plataforma')}
                >
                  Plataforma <span className={estadoMostrarOcultar.plataforma}> ↑↓</span>
                </th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {watchlist
                .sort((a, b) => {
                  if (sortBy === 'id') {
                    return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
                  } else if (sortBy === 'plataforma') {
                    return sortOrder === 'asc' ? a.plataforma.localeCompare(b.plataforma) : b.plataforma.localeCompare(a.plataforma);
                  }
                  return 0;
                })
                .map((pelicula) => (
                  <tr key={pelicula.id}>
                    <td>{pelicula.id}</td>
                    <td>{pelicula.pelicula}</td>
                    <td>{pelicula.plataforma}</td>
                    <td>
                      <Boton contenido="Ya ví esta pelicula" clase="Btn BtnGreen" onClick={() => eliminarPelicula(pelicula.id)} />
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
        <Boton contenido="Agregar pelicula" clase="Btn BtnDark" onClick={añadirPelicula} />
      </div>
    </>
  );
}

export default Inicio;
