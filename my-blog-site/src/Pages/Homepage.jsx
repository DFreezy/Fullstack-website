import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import CustomModal from '../components/modal';  // Assuming CustomModal is in a 'components' folder

export default function Homepage() {
    Modal.setAppElement('#root'); // Accessibility setting for modal

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [formType, setFormType] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        email: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post('https://fullstack-website-backend.onrender.com/submit-form', formData); // Change endpoint as needed
            setSuccess('Form submitted successfully!');
            setFormData({ name: '', description: '', email: '' }); // Reset form
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const openModalHandler = (title, content, formType = null) => {
        setModalContent(content);
        setModalTitle(title);
        setFormType(formType);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const renderForm = () => {
        if (formType === 'mobileApp') {
            return (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block">App Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    {error && <div className="text-red-500">{error}</div>}
                    {success && <div className="text-green-500">{success}</div>}
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            );
        }

        if (formType === 'websiteDev') {
            return (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block">Website Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="email" className='block'>Email</label>
                        <input id="email"
                               name="email"
                               value={formData.email}
                               onChange={handleChange}
                               className="w-full p-2 border border-gray-300 rounded"
                               required
                               />
                    </div>
                    {error && <div className="text-red-500">{error}</div>}
                    {success && <div className="text-green-500">{success}</div>}
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            );
        }

        return null;
    };

    return (
        <>
            <div className="bg-[url('https://www.shutterstock.com/image-photo/hands-typing-on-laptop-programming-600nw-2480023489.jpg')] bg-cover bg-center h-screen pb-0 font-serif">
                <h1 className="text-center text-6xl tracking-widest text-white">FOR YOU I CAN DO </h1>
                <h1 className="text-center font-bold text-6xl tracking-widest text-white">TWO THINGS:</h1>
                <br />
                <div className="flex items-center justify-center space-x-16 mt-6">
                    <div className="w-48 h-48 rounded-full bg-white hover:bg-red-500 flex flex-col items-center justify-center transition-colors duration-300 p-8 cursor-pointer"
                        onClick={() => openModalHandler("Mobile App Development", "Please fill out the form for mobile app development.", "mobileApp")}>
                        <img src="https://cdn1.vectorstock.com/i/1000x1000/18/05/icon-phone-mobile-symbol-with-shadow-vector-25181805.jpg" alt="Phone Icon" className="w-24 h-24 rounded-full mb-2" />
                        <h1 className="text-center text-base font-semibold">Mobile App Development</h1>
                        <h1>Click to start</h1>
                    </div>

                    <div className="w-48 h-48 rounded-full bg-white hover:bg-red-500 flex flex-col items-center justify-center transition-colors duration-300 p-8 cursor-pointer"
                        onClick={() => openModalHandler("Website Development", "Please fill out the form for website development.", "websiteDev")}>
                        <img src="https://static.vecteezy.com/system/resources/previews/007/126/469/non_2x/internet-website-click-icon-vector.jpg" alt="Internet Icon" className="w-24 h-24 rounded-full mb-2" />
                        <h1 className="text-center text-base font-semibold">Website Development</h1>
                        <h1>Click to start</h1>
                    </div>
                </div>
            </div>

            <CustomModal
                isOpen={modalIsOpen}
                onClose={closeModal}
                content={modalContent}
                title={modalTitle}
            >
                {renderForm()}
            </CustomModal>
        </>
    );
}
