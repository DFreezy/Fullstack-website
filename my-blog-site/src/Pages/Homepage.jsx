import React, { useState } from 'react';
import Modal from 'react-modal';
import CustomModal from '../components/modal';

export default function Homepage() {
    Modal.setAppElement('#root');
    
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalTitle, setModalTitle] = useState('');

    const openModalHandler = (title, content) => {
        setModalContent(content);
        setModalTitle(title);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <>
            <div className="bg-[url('https://www.shutterstock.com/image-photo/hands-typing-on-laptop-programming-600nw-2480023489.jpg')] bg-cover bg-center h-screen pb-0 font-serif">
                <h1 className="text-center text-6xl tracking-widest text-white">AT DFREEZY WE DO </h1>
                <h1 className="text-center font-bold text-6xl tracking-widest text-white">TWO THINGS:</h1>
                <br />
                <div className="flex items-center justify-center space-x-16 mt-6">
                    <div className="w-48 h-48 rounded-full bg-white hover:bg-red-500 flex flex-col items-center justify-center transition-colors duration-300 p-8 cursor-pointer" 
                        onClick={() => openModalHandler("Mobile App Development", "This modal provides details about Mobile App Development.")}>
                        <img src="https://cdn1.vectorstock.com/i/1000x1000/18/05/icon-phone-mobile-symbol-with-shadow-vector-25181805.jpg" alt="Phone Icon" className="w-24 h-24 rounded-full mb-2" />
                        <h1 className="text-center text-base font-semibold">Mobile App Development</h1>
                        <h1>Click to start</h1>
                    </div>

                    <h1 className="text-white font-bold text-xl">Choose ⬅️➡️ wisely</h1>

                    <div className="w-48 h-48 rounded-full bg-white hover:bg-red-500 flex flex-col items-center justify-center transition-colors duration-300 p-8 cursor-pointer" 
                        onClick={() => openModalHandler("Website Development", "This modal provides details about Website Development.")}>
                        <img src="https://static.vecteezy.com/system/resources/previews/007/126/469/non_2x/internet-website-click-icon-vector.jpg" alt="Internet Icon" className="w-24 h-24 rounded-full mb-2" />
                        <h1 className="text-center text-base font-semibold">Website Development</h1>
                        <h1>Click to start</h1>
                    </div>
                </div>
            </div>
            
            <div className="bg-white mt-6">
                <h1 className="text-center text-7xl tracking-widest text-black mb-8">Blog latest</h1>
                <div className="flex flex-wrap justify-evenly">
                    <div className='bg-slate-300 py-4 px-6 cursor-pointer flex flex-col items-center max-w-sm' 
                        onClick={() => openModalHandler("Difference between Bootstrap and Tailwind", "The choice between Bootstrap and Tailwind CSS often depends on project requirements and personal preference. If you want to quickly create a functional, consistent design with minimal effort, Bootstrap might be the way to go. If you prefer a more flexible and customizable approach that allows for unique designs, Tailwind CSS is an excellent choice.")}>
                        <img src="https://res-1.cloudinary.com/hotwhbffo/image/upload/q_auto/v1/ghost-blog-images/tailwindcss-vs-bootstrap.png" width="200" height="200" alt="Bootstrap vs Tailwind"/>
                        <h1 className="text-lg font-semibold">Difference between Bootstrap and Tailwind</h1>
                        <p className="text-sm break-words">The choice between Bootstrap and Tailwind CSS often depends on project requirements and personal preference.</p>
                        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200">See more</button>
                    </div>

                    <div className='bg-slate-300 py-4 px-6 cursor-pointer flex flex-col items-center max-w-sm' 
                        onClick={() => openModalHandler("Should you get a website or an app?", "Deciding between getting a website or an app can be a decision that might impact your budget, but also the potential growth your business could see. Let's not forget about the SEO ranking as well.")}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS1SJGLGHocpkt5zGbOtlik85sMMNtG6qhOw&s" width="200" height="200" alt="Website or App"/>
                        <h1 className="text-lg font-semibold">Should you get a website or an app?</h1>
                        <p>Deciding between getting a website or an app can impact your budget and growth.</p>
                        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200">See more</button>
                    </div>

                    <div className='bg-slate-300 py-4 px-6 cursor-pointer flex flex-col items-center max-w-sm' 
                        onClick={() => openModalHandler("How to get your site to rank higher", "Improving your site's ranking in search engine results (SEO) involves various strategies and techniques. Here are some key approaches you can take: Keyword Research: Identify relevant keywords that your target audience is searching for.")}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqzKr0H3bV4pri-kcKJ_X4B1Kjm57Xi-nWOQ&s" width="200" height="200" alt="SEO Tips"/>
                        <h1 className="text-lg font-semibold">How to get your site to rank higher</h1>
                        <p>Improving your site's ranking in search engine results involves various strategies and techniques.</p>
                        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200">See more</button>
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <button className='mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200'>See more Blogs</button>
                </div>
            </div>

            <div>
                <footer class="bg-black">
                 <h1>Stuff</h1>
                </footer>
            </div>

            <CustomModal 
                isOpen={modalIsOpen}
                onClose={closeModal}
                content={modalContent}
                title={modalTitle}
            />
        </>
    );
}
