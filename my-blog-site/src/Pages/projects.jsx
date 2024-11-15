import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');
    const [image, setImage] = useState('');

    // Fetch projects from the backend
    useEffect(() => {
        fetchProjects();
    }, []);

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
            if (email !== "duwaynefrieslaar23@gmail.com") {
                alert('Invalid user');
            } else {
                const newProject = { name, email, comment, image };
                const response = await axios.post('http://localhost:5000/projects', newProject);
                setProjects([...projects, response.data]); // Add the new project to the list
                setName('');  // Clear input fields after submission
                setEmail('');
                setComment('');
                setImage('');
            }
        } catch (error) {
            console.error("Error adding project:", error);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add Project</h2>
            <form onSubmit={handleSubmit} className="mb-8 bg-white p-4 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Comment:</label>
                    <textarea 
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)} 
                        required 
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Image URL:</label>
                    <input 
                        type="text" 
                        value={image} 
                        onChange={(e) => setImage(e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Add Project
                </button>
            </form>

            <h3 className="text-xl font-bold mb-4">Project List</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                    <div 
                        key={project.id} 
                        className="text-center p-4 border border-gray-200 rounded-lg shadow-md bg-white"
                    >
                        {project.image && <img className='py-4 w-full h-48 object-cover' src={project.image} alt="Project"/>}
                        <h4 className="text-lg font-semibold">{project.name}</h4>
                        <p className="text-sm text-gray-500">{project.email}</p>
                        <p className="mt-2">{project.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
