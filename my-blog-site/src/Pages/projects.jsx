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
            const response = await axios.get("https://fullstack-website-backend.onrender.com/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchProjects = async () => {
        try {
            const response = await axios.get("https://fullstack-website-backend.onrender.com/projects");
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

            const response = await axios.post("https://fullstack-website-backend.onrender.com/projects", formData, {
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
            const response = await axios.delete(`https://fullstack-website-backend.onrender.com

/projects/${id}`);
            setProjects(projects.filter(project => project.id !== id)); // Remove the deleted project from the list
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Error deleting project. Please try again later.');
        }
    };

    return (
        <div className="text-center min-h-screen flex flex-col bg-blue-50 bg-green-100 italic">
            <div className="p-6 max-w-screen-xl mx-auto flex-grow">
                {/* Form Section */}

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
