import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Reviews() {
  const [userData, setUserData] = useState([]);

  // Fetch user data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  // Delete handler (if needed)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/users/${id}`);
      setUserData((prevData) => prevData.filter((user) => user.id !== id));
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user');
    }
  };

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to the backend
      const response = await axios.post('http://localhost:3001/users', {
        email,
        name,
        comment,
      });

      console.log('User added:', response.data);
      alert('User added successfully!');
      setEmail(''); // Reset form
      setName('');
      setComment('');
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Error adding user');
    }
  };

  return (
    <>
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
      <input
        type="text"
        placeholder="My thoughts are"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
    <div>
      {/* Display User Data with Delete Option */}
      {userData.length > 0 ? (
        userData.map((data) => (
          <div key={data.id} style={{ border: '1px solid gray', width: '500px', margin: '10px' }}>
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
    </>
  );
}
