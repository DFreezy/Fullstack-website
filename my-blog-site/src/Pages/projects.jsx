import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]); // To store users
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState(null); // For image preview

    // Fetch users and projects from the backend
    useEffect(() => {
        fetchUsers();
        fetchProjects();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users');
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:5000/projects');
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Check if the user is authorized
            if (email !== "duwaynefrieslaar23@gmail.com") {
                alert('Invalid user');
                return;
            }
            
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('comment', comment);
            if (image) {
                formData.append('image', image); // Attach the image file to FormData
            }

            const response = await axios.post('http://localhost:5000/projects', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure the backend handles the image
                },
            });

            setProjects([...projects, response.data]); // Add the new project to the list
            setName('');  // Clear input fields after submission
            setEmail('');
            setComment('');
            setImage(null);
            setImagePreview(null);
        } catch (error) {
            console.error("Error adding project:", error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result); // Set image preview
            reader.readAsDataURL(file);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/projects/${id}`);
            setProjects(projects.filter(project => project.id !== id)); // Remove the deleted project from the list
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Error deleting project. Please try again later.');
        }
    };

    return (
        <div className="text-center min-h-screen flex flex-col bg-blue-50">
            <div className="p-6 max-w-screen-xl mx-auto flex-grow">
                <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">Add a New Project</h2>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="grid grid-cols-1 gap-4 mb-6">
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold">Name:</label>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold">Email:</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold">Comment:</label>
                            <textarea 
                                value={comment} 
                                onChange={(e) => setComment(e.target.value)} 
                                required 
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold">Project Image:</label>
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                            {imagePreview && (
                                <div className="mt-4">
                                    <img src={imagePreview} alt="Image Preview" className="w-full h-48 object-cover rounded" />
                                </div>
                            )}
                        </div>

                        <button 
                            type="submit" 
                            className="w-full p-3 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 focus:ring-2 focus:ring-blue-500">
                            Add Project
                        </button>
                    </div>
                </form>

                {/* List of Projects displayed as widgets */}
                <h3 className="text-xl font-semibold text-blue-700 mt-8 mb-4">All Projects</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {projects.map(project => (
                        <div key={project.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <h4 className="text-xl font-semibold text-gray-800">{project.name}</h4>
                            <p className="text-gray-700 mt-2">{project.comment}</p>
                            <p className="text-gray-500 mt-2">{project.email}</p>
                            
                            {/* Display image if available */}
                            {project.image && (
                                <img src={`http://localhost:5000${project.image}`} alt="Project" className="mt-4 w-full h-48 object-cover rounded-md" />
                            )}
                            
                            <div className="flex justify-between mt-4">
                                <button 
                                    onClick={() => handleDelete(project.id)}
                                    className="text-red-600 hover:text-red-800 focus:outline-none"
                                >
                                    Delete Project
                                </button>
                                <button 
                                    className="text-blue-600 hover:text-blue-800 focus:outline-none"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
