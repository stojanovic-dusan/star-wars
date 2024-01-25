import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './PlanetModal.css'

const PlanetModal = ({ planetData, isOpen, onRequestClose }) => {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const fetchResidents = async () => {
      const residentsData = await Promise.all(
        planetData.residents.map(async (residentURL) => {
          const response = await fetch(residentURL);
          const residentData = await response.json();
          return residentData.name;
        })
      );
      setResidents(residentsData);
    };

    if (isOpen) {
      fetchResidents();
    }
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
      <div className='d-flex flex-column flex-md-row gap-2 flex-wrap'>
        {residents.map((resident, index) => (
          <p
            key={index}
            className="mb-0"
          >
            {resident}
          </p>
        ))}
      </div>
    </Modal>
  );
};

export default PlanetModal;


