import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Homepage from './Pages/Homepage';
import Contact from './Pages/contact';
import Footer from './components/Footer';
import Start from './Pages/Start';
import CustomModal from './components/modal';
import ReactModal from 'react-modal';
import axios from 'axios';

ReactModal.setAppElement('#root');

export default function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [userData, setUserData] = useState([]); // State to store user data

  const openModal = (content) => {
    setModalContent(content);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Fetch users from backend
  const getUser = () => {
    fetch("http://localhost:3001/users")
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
      await axios.delete(`http://localhost:3001/users/${id}`);
      // Update the state to reflect deletion
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
        </Routes>

        <Footer />
        {/* Modal Component */}
        <CustomModal 
          isOpen={modalIsOpen} 
          onClose={closeModal} 
          content={modalContent} 
        />
        
        {/* Display User Data with Delete Option */}
        <div>
          {userData && userData.length > 0 ? (
            userData.map((data) => (
              <div key={data.id} style={{border:"1px solid gray", width:"500px", margin: "10px"}}>
                <h1>Name: {data.name}</h1>
                <h1>Email: {data.email}</h1>
                <p>Comment: {data.comment}</p>
                <button onClick={() => handleDelete(data.id)}>Delete</button>
              </div>
            ))
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
      </BrowserRouter>
    </>
  );
}
