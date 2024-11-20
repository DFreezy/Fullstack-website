import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

export default function CustomModal({ isOpen, onClose, content }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: ''
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users', formData);
      alert('Form submitted successfully!');
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('Error submitting the form');
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel={content}>
      <h2>{content}</h2>
      <form onSubmit={handleSubmit} className="modal-form">
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Comment</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
}
