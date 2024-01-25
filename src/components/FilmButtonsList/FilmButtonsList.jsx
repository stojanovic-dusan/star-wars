import React from 'react';
import FilmButton from '../FilmButton/FilmButton';
import './FilmButtonList.css'

const FilmButtonsList = ({ films, onFilmClick, activeFilmButton }) => (
    <div className="buttons-container mb-5 d-flex flex-md-wrap justify-content-md-center">
      {films.map(film => (
        <FilmButton
          key={film.episode_id}
          film={film}
          onClick={() => onFilmClick(film)}
          isActive={film === activeFilmButton}
        />
      ))}
    </div>
  );
  
  export default FilmButtonsList;