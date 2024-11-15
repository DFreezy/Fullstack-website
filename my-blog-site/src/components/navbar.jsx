import React from "react";
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div className="bg-black text-white">
            <nav className="flex items-center justify-between p-4">
                {/* Logo Section */}
                <div>
                    <Link to="/">
                        <img src="/logo.png" alt="logo" width="100" height="100" />
                    </Link>
                </div>
                
                {/* Navigation Links Section */}
                <ul className="list-none flex flex-row space-x-8">
                    <li className="my-4 hover:text-red-500 cursor-pointer">
                        <Link to="/Start">Start here</Link>
                    </li>
                    <li className="my-4 hover:text-red-500 cursor-pointer">
                        <Link to="/Projects">Projects</Link>
                    </li>
                    <li className="my-4 hover:text-red-500 cursor-pointer">
                        <Link to="/Reviews">Reviews</Link>
                    </li>
                    <li className="my-4 hover:text-red-500 cursor-pointer">
                        <Link to="/Contact">Contact</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
