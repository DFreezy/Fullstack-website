import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Homepage from './Pages/Homepage';
import CustomModal from './components/modal'; // Your custom modal component
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

export default function App() {
  // State to control modal visibility
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const openModal = (content) => {
    setModalContent(content);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage openModal={openModal} />} />
        </Routes>

        {/* Modal Component */}
        <CustomModal 
          isOpen={modalIsOpen} 
          onClose={closeModal} 
          content={modalContent} 
        />
      </BrowserRouter>
    </>
  );
}
