import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './OpeningCrawlModal.css'

const OpeningCrawlModal = ({ isOpen, onRequestClose, openingCrawl }) => (
    <Modal show={isOpen} onHide={onRequestClose}>
        <Modal.Header closeButton>
            <Modal.Title>Opening Crawl</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>{openingCrawl}</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onRequestClose}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
);

export default OpeningCrawlModal;
