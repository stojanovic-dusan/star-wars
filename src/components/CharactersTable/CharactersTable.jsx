import React, { useState, useEffect, useCallback } from "react";
import { Tooltip } from "react-tooltip";
import "./CharactersTable.css";

const CharactersTable = ({ characters, onPlanetClick }) => {
    const [sortedCharacters, setSortedCharacters] = useState([...characters]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [filterText, setFilterText] = useState('');

    const sortCharacters = useCallback(() => {
        const sorted = [...characters].sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        });

        setSortedCharacters(sorted);
    }, [characters, sortOrder]);

    useEffect(() => {
        sortCharacters();
    }, [sortCharacters]);

    const handleSort = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
    };

    const handleFilterByName = () => {
        const filteredCharacters = characters.filter((character) =>
            character.name.toLowerCase().includes(filterText.toLowerCase())
        );
        setSortedCharacters(filteredCharacters);
    };

  return (
    <section className="section-characters py-3 py-md-4">
      <div className="filter-inputs d-flex flex-column flex-md-row align-items-md-center justify-content-md-center mb-3">
        <div className="me-md-3 mb-3 mb-md-0">
          <label htmlFor="sortOrder">Sort characters by name: </label>
          <select id="sortOrder" onChange={handleSort} value={sortOrder} className="ms-2">
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>

        <div
          className="
                    search-input-container
                    ms-md-3 d-flex align-items-md-center flex-column flex-md-row gap-3 gap-md-0"
        >
          <input
            type="text"
            placeholder="Filter by name"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleFilterByName()}
            className="border me-2 form-control"
          />
          <button onClick={handleFilterByName} className="border btn btn-dark btn-md px-3">
            Filter
          </button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Eye Color</th>
            <th>Homeworld</th>
          </tr>
        </thead>
        <tbody>
          {sortedCharacters.map((character) => (
            <tr key={character.name}>
              <td>{character.name}</td>
              <td className="eye-color-cell">
                <div data-tooltip-content={character.eye_color} data-tooltip-id={`tooltip-${character.name}`} data-tooltip-place="top" className="eye-box mx-auto mx-md-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    className="bi bi-eye"
                    fill={character.eye_color === "hazel" ? "#C8B575" : character.eye_color === "blue-gray" ? "#6699CC" : character.eye_color}
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                  </svg>
                </div>
                <Tooltip id={`tooltip-${character.name}`} />
              </td>
              <td>
                <button onClick={() => onPlanetClick(character.homweroldURL)} className="btn btn-secondary py-1">
                  {character.homeworld}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default CharactersTable;