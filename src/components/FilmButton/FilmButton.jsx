import React from 'react';
import './FilmButton.css'

const FilmButton = ({ film, onClick, isActive }) => (
  <div className={`film-container ${isActive ? 'active' : ''}`}>
    <button className="btn btn-dark m-2" onClick={() => onClick(film)}>
      {film.title}
    </button>
  </div>
);

export default FilmButton;