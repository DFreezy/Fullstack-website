import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Homepage from './Pages/Homepage';
export default function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}
