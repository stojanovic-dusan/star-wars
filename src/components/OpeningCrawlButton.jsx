import React from 'react';

const OpeningCrawlButton = ({ onClick, film }) => (
 <div className='opening-crawl-button-container d-flex align-items-center justify-content-center'>
    <button
      onClick={() => onClick(film)}
      className="border rounded btn btn-dark btn-md"
    >
      View Opening Crawl
    </button>
 </div>
);

export default OpeningCrawlButton;
