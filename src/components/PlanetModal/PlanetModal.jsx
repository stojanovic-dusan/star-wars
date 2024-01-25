import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './PlanetModal.css';

const PlanetModal = ({ planetData, isOpen, onRequestClose }) => {
  const [residents, setResidents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const residentsData = await Promise.all(
          planetData.residents.map(async (residentURL) => {
            const response = await axios.get(residentURL);
            return response.data.name;
          })
        );
        setResidents(residentsData);
        setError(null);
      } catch (error) {
        console.error("Error fetching residents:", error);
        setError("Error while loading residents");
        setResidents([]);
      }
    };

    if (isOpen) {
      fetchResidents();
      document.body.classList.add('body-overflow-hidden');
    }

    return () => {
      document.body.classList.remove('body-overflow-hidden');
    };
  }, [planetData, isOpen]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2 className='mb-3'>{planetData.name}</h2>
      <div className='mb-5'>
        <p><span className='fw-bold'>Climate:</span> {planetData.climate}</p>
        <p><span className='fw-bold'>Gravity:</span> {planetData.gravity}</p>
        <p><span className='fw-bold'>Terrain:</span> {planetData.terrain}</p>
        <p><span className='fw-bold'>Population:</span> {planetData.population}</p>
      </div>

      <h3 className='mb-3'>Residents:</h3>
      {error ? (
        <p className="text-warning">Error while getting residents data</p>
      ) : (
        <div className='d-flex flex-column flex-md-row gap-2 flex-wrap'>
          {residents.map((resident) => (
            <p
              key={resident.name}
              className="mb-0"
            >
              {resident}
            </p>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default PlanetModal;
