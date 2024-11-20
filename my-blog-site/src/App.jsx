import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './Pages/Homepage';
import Contact from './Pages/Contact';
import Footer from './components/Footer';
import Start from './Pages/Start';
import Reviews from './Pages/Reviews';
import Projects from './Pages/projects';
import CustomModal from './components/modal';
import ReactModal from 'react-modal';
import axios from 'axios';

ReactModal.setAppElement('#root');

export default function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [userData, setUserData] = useState([]);

  const openModal = (content) => {
    setModalContent(content);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Fetch users from backend
  const getUser = () => {
    fetch("http://localhost:5000/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => setUserData(json)) // Save data to state
      .catch((error) => console.error("Error fetching user data:", error));
  };

  // Delete a user by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      setUserData(userData.filter((user) => user.id !== id));
      alert('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user');
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage openModal={openModal} />} />
          <Route path="/Start" element={<Start />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Reviews" element={<Reviews />} />
          <Route path="/Projects" element={<Projects />} />
        </Routes>

        <Footer />
        <CustomModal 
          isOpen={modalIsOpen} 
          onClose={closeModal} 
          content={modalContent} 
        />
      </BrowserRouter>
    </>
  );
}
