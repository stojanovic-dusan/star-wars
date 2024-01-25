import React from 'react';
import OpeningCrawlButton from './OpeningCrawlButton';

const FilmDetails = ({ selectedFilmTitle, showOpeningCrawlButton, onOpeningCrawlClick, film }) => (
  <div className='d-flex flex-column flex-md-row justify-content-md-center align-items-md-center mb-2 mt-4 gap-3'>
    <h2 className='text-white text-center me-md-4'>Characters in {selectedFilmTitle} movie</h2>
    {showOpeningCrawlButton && (
      <OpeningCrawlButton
        onClick={() => {
          onOpeningCrawlClick(film);
        }}
        film={film}
      />
    )}
  </div>
);

export default FilmDetails;
