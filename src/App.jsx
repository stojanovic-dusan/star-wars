import React, { useState, useEffect } from "react";
import axios from "axios";
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
  // States hooks
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
  const [error, setError] = useState(null);
  const [planetCache, setPlanetCache] = useState({});

  // Fetching movies
  useEffect(() => {
    setLoading(true);
    axios.get("https://swapi.dev/api/films")
      .then((response) => {
        setFilms(response.data.results);
        console.log(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching films:", error);
        setError(error);
        setLoading(false);
      })
      .finally(() => { setLoading(false) })
  }, []);

  // Fetching characters
  const fetchCharacters = async (characters) => {
    setLoading(true);

    try {
      const charactersData = await Promise.all(
        characters.map(async (characterURL) => {
          const characterResponse = await axios.get(characterURL);
          const character = characterResponse.data;

          // Check if planet data is cached
          let planetData = planetCache[character.homeworld];
          if (!planetData) {
            const planetResponse = await axios.get(character.homeworld);
            planetData = planetResponse.data;
            // Update planet cache
            setPlanetCache(prevCache => ({ ...prevCache, [character.homeworld]: planetData }));
          }

          return {
            name: character.name,
            eye_color: character.eye_color,
            homeworld: planetData.name,
            homweroldURL: character.homeworld,
          };
        })
      );

      setSelectedFilm(charactersData);
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlanetClick = async (homeworld) => {
    setLoading(true);

    try {
      // Check if planet data is cached
      let planetData = planetCache[homeworld];
      if (!planetData) {
        const planetResponse = await axios.get(homeworld);
        planetData = planetResponse.data;
        // Update planet cache
        setPlanetCache(prevCache => ({ ...prevCache, [homeworld]: planetData }));
      }

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
    setActiveFilmButton(selectedFilm);
    setSelectedOpeningCrawl(selectedFilm.opening_crawl);
    setShowOpeningCrawlButton(true);
  };

  const handleOpeningCrawlClick = () => setIsOpeningCrawlModalOpen(true);

  return (
    <>
      {loading && <Loader />}

      {error && (
        <div className="container mt-5">
          <h1 className="text-danger">There has been an error, try reloading the page.</h1>
        </div>
      )}

      {!error && (
        <div className="container mt-5">
          <AppTitle />
          <FilmButtonsList films={films} onFilmClick={handleFilmButtonClick} activeFilmButton={activeFilmButton} />

          {selectedFilm && (
            <>
              <FilmDetails selectedFilmTitle={selectedFilmTitle} showOpeningCrawlButton={showOpeningCrawlButton} onOpeningCrawlClick={handleOpeningCrawlClick} film={selectedFilm} />

              <CharactersTable characters={selectedFilm} onPlanetClick={handlePlanetClick} />

              {selectedPlanet && <PlanetModal isOpen={isPlanetModalOpen} onRequestClose={() => setIsPlanetModalOpen(false)} planetData={selectedPlanet} />}
            </>
          )}

          {isOpeningCrawlModalOpen && <OpeningCrawlModal isOpen={isOpeningCrawlModalOpen} onRequestClose={() => setIsOpeningCrawlModalOpen(false)} openingCrawl={selectedOpeningCrawl} />}
        </div>
      )}
      <GalaxySky />
    </>
  );
};

export default StarWarsApp;
