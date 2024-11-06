import React, { useState } from 'react';
import axios from 'axios';

export default function Contact() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to the backend
      const response = await axios.post('http://localhost:3001/users', {
        email,
        name,
      });

      console.log('User added:', response.data);
      alert('User added successfully!');
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Error adding user');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Add email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <hr />
      <input
        type="text"
        placeholder="Add name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}
