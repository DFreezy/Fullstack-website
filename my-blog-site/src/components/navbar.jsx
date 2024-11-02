import React from "react";
import {Link} from 'react-router-dom'

export default function Navbar() {
    return (
        <div className="bg-black text-white">
            <nav className="flex items-center justify-between p-4">
                {/* Logo Section */}
                <div>
                    <img src="/logo.png" alt="logo" width="100" height="100" />
                </div>
                
                {/* Navigation Links Section */}
                <ul className="list-none flex flex-row space-x-8">
                  <Link to="./Pages/Start.jsx"><li className="my-4 hover:text-red-500 cursor-pointer">Start here</li></Link> 
                    <li className="my-4 hover:text-red-500 cursor-pointer">Blog</li>
                    <li className="my-4 hover:text-red-500 cursor-pointer">Recommended</li>
                    <li className="my-4 hover:text-red-500 cursor-pointer">Contact</li>
                </ul>
            </nav>
        </div>
    );
}
