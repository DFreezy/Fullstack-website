import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Homepage from './Pages/Homepage';
import Footer from './components/Footer';
import Start from './Pages/Start';
import CustomModal from './components/modal'; // Your custom modal component
import ReactModal from 'react-modal';

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
        </Routes>

        <Footer />
        {/* Modal Component */}
        <CustomModal 
          isOpen={modalIsOpen} 
          onClose={closeModal} 
          content={modalContent} 
        />
        
        {/* Display User Data */}
        <div>
          {userData && userData.length > 0 ? (
            userData.map((data) => (
              <div key={data.id} style={{border:"1px solid gray", width:"500px"}}>
                <h1>Name: {data.name}</h1>
                <h1>Username: {data.userName}</h1>
                <h1>Email: {data.email}</h1>
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


