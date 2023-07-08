import React from 'react';
import { useState } from 'react';
import Boton from '../componentes/Boton';
import { useNavigate } from 'react-router';
import './estilosComunes.css';

function Agregar(){
    const redirigir = useNavigate();
    const [pelicula, setPelicula] = useState('');
    const [plataforma, setPlataforma] = useState('netflix');
  
    function añadirPelicula(event) {
      event.preventDefault();
  
      // Obtener la lista de películas existente en el local storage (si existe)
      const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  
      // Crear un objeto para representar la película
      const peliculaObjeto = {
        id: watchlist.length + 1, // Generar un ID único para la película
        pelicula: pelicula,
        plataforma: plataforma
      };
  
      // Agregar la película a la watchlist
      watchlist.push(peliculaObjeto);
  
      // Guardar la watchlist actualizada en el local storage
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
  
      redirigir('/'); // Después de agregar la película, redirigir a la página de inicio
    }
    return (
      <>
      <div className="centrar">
      <h1>Añadir a mi watchlist</h1>
        <form className='formulario'>
          <label>Pelicula: </label>
          <input type='text' placeholder='Ejemplo: American Psycho, Avengers: Endgame' value={pelicula} onChange={(event) => setPelicula(event.target.value)}/>
          <label>Plataforma: </label>
          <select value={plataforma} onChange={(event) => setPlataforma(event.target.value)}>
            <option value="Netflix">Netflix</option>
            <option value="Amazon">Amazon Prime Video</option>
            <option value="Disney+">Disney+</option>
            <option value="Crunchyroll">Crunchyroll</option>
            <option value="Hbo Max">HBO Max</option>
            <option value="Paramount+">Paramount+</option>
            <option value="Otra plataforma">Otra plataforma</option>
          </select>
          <Boton contenido="Agregar pelicula" clase="Btn BtnDark" onClick={añadirPelicula}/>
        </form>
      </div>
      </>
    )
}

export default Agregar;