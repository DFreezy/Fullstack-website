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
                    <li className="my-4 hover:text-red-500">Start here</li>
                    <li className="my-4 hover:text-red-500">Blog</li>
                    <li className="my-4 hover:text-red-500">Recommended</li>
                    <li className="my-4 hover:text-red-500">Contact</li>
                </ul>
            </nav>
        </div>
    );
}
