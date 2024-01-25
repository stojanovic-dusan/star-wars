import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Modal from "react-modal";

import FilmButtonsList from "./components/FilmButtonsList/FilmButtonsList";
import CharactersTable from "./components/CharactersTable/CharactersTable";
import FilmDetails from "./components/FilmDetails";
import PlanetModal from "./components/PlanetModal/PlanetModal";
import OpeningCrawlModal from "./components/OpeningCrawlModal/OpeningCrawlModal";

import Loader from "./components/Loader/Loader";
import GalaxySky from "./components/GalaxySky/GalaxySky";
import AppTitle from "./components/AppTitle";

Modal.setAppElement("#root");

const StarWarsApp = () => {

  //States hooks
  const [films, setFilms] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [activeFilmButton, setActiveFilmButton] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedFilmTitle, setSelectedFilmTitle] = useState("");
  const [isPlanetModalOpen, setIsPlanetModalOpen] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [isOpeningCrawlModalOpen, setIsOpeningCrawlModalOpen] = useState(false);
  const [selectedOpeningCrawl, setSelectedOpeningCrawl] = useState();
  const [showOpeningCrawlButton, setShowOpeningCrawlButton] = useState(false);

  //Fetching movies
  useEffect(() => {
    setLoading(true);
    fetch("https://swapi.dev/api/films")
      .then((response) => response.json())
      .then((data) => setFilms(data.results))
      .catch((error) => console.error("Error fetching films:", error))
      .finally(() => setLoading(false));
  }, []);

  //Fetching characters
  const fetchCharacters = async (characters) => {
    setLoading(true);

    const charactersData = await Promise.all(
      characters.map(async (characterURL) => {
        const response = await fetch(characterURL);
        const character = await response.json();
        const planetResponse = await fetch(character.homeworld);
        const planetData = await planetResponse.json();

        return {
          name: character.name,
          eye_color: character.eye_color,
          homeworld: planetData.name,
          homweroldURL: character.homeworld,
        };
      })
    );

    setSelectedFilm(charactersData);
    setLoading(false);
  };

  const handlePlanetClick = async (homeworld) => {
    setLoading(true);

    try {
      const planetResponse = await fetch(homeworld);
      const planetData = await planetResponse.json();

      setSelectedPlanet(planetData);
      setIsPlanetModalOpen(true);
    } catch (error) {
      console.error("Error fetching planet data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilmButtonClick = (selectedFilm) => {
    fetchCharacters(selectedFilm.characters);
    setSelectedFilmTitle(selectedFilm.title);
    setActiveFilmButton(selectedFilm)
    setSelectedOpeningCrawl(selectedFilm.opening_crawl);
    setShowOpeningCrawlButton(true);
  };

  const handleOpeningCrawlClick = () => setIsOpeningCrawlModalOpen(true);

  return (
    <>
      {loading && <Loader />}

      <div className="container mt-5">
        <AppTitle />
        <FilmButtonsList
          films={films}
          onFilmClick={handleFilmButtonClick}
          activeFilmButton={activeFilmButton}
        />

        {selectedFilm && (
          <>
            <FilmDetails 
              selectedFilmTitle={selectedFilmTitle} 
              showOpeningCrawlButton={showOpeningCrawlButton} 
              onOpeningCrawlClick={handleOpeningCrawlClick} 
              film={selectedFilm} 
            />

            <CharactersTable 
              characters={selectedFilm} 
              onPlanetClick={handlePlanetClick} 
            />

            {selectedPlanet && 
              <PlanetModal 
                isOpen={isPlanetModalOpen} 
                onRequestClose={() => setIsPlanetModalOpen(false)} 
                planetData={selectedPlanet} 
              />}
          </>
        )}

        {isOpeningCrawlModalOpen && 
          <OpeningCrawlModal 
            isOpen={isOpeningCrawlModalOpen} 
            onRequestClose={() => setIsOpeningCrawlModalOpen(false)} 
            openingCrawl={selectedOpeningCrawl} 
          />}
      </div>
      <GalaxySky />
    </>
  );
};

export default StarWarsApp;
