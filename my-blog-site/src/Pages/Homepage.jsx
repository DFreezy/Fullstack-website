import React from 'react'

export default function Homepage() {
    return (
        <>
        <div className="bg-[url('https://www.shutterstock.com/image-photo/hands-typing-on-laptop-programming-600nw-2480023489.jpg')] bg-cover bg-center h-screen pb-0 font-serif">
        <h1 className="text-center text-6xl tracking-widest text-white">AT DFREEZY WE DO </h1>
        <h1 className="text-center font-bold text-6xl tracking-widest text-white">TWO THINGS:</h1>
        <br />
                
                              {/* Circular Image Container with Hover Effect */}
                              <div className="flex items-center justify-center space-x-16 mt-6">
                    <div className="w-48 h-48 rounded-full bg-white hover:bg-red-500 flex flex-col items-center justify-center transition-colors duration-300 p-8">
                        <img 
                            src="https://cdn1.vectorstock.com/i/1000x1000/18/05/icon-phone-mobile-symbol-with-shadow-vector-25181805.jpg" 
                            alt="Phone Icon" 
                            className="w-24 h-24 rounded-full mb-2"
                        />
                        <h1 className="text-center text-base font-semibold">Mobile App Development</h1>
                        <h1>Click to start</h1>
                    </div>

                    <h1 class="text-white font-bold text-xl">Choose ⬅️➡️ wisely</h1>

                    <div className="w-48 h-48 rounded-full bg-white hover:bg-red-500 flex flex-col items-center justify-center transition-colors duration-300 p-8">
                        <img 
                            src="https://static.vecteezy.com/system/resources/previews/007/126/469/non_2x/internet-website-click-icon-vector.jpg" 
                            alt="Internet Icon" 
                            className="w-24 h-24 rounded-full mb-2"
                        />
                        <h1 className="text-center text-base font-semibold">Website Development</h1>
                        <h1>Click to start</h1>
                    </div>
                </div>
            </div>
            <div className="bg-white">
                <h1 className="text-center text-7xl tracking-widest text-black mb-8">Blog latest</h1>
                <div className="flex flex-row justify-evenly">
                    <div className='bg-slate-300 py-4 px-6'>
                        <img src="https://res-1.cloudinary.com/hotwhbffo/image/upload/q_auto/v1/ghost-blog-images/tailwindcss-vs-bootstrap.png" width="200" height="200"/>
                        <h1>Difference between Bootstrap and tailwind</h1>
                    </div>
                    <div className='bg-slate-300 py-4 px-6'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS1SJGLGHocpkt5zGbOtlik85sMMNtG6qhOw&s" width="200" height="200"/>
                        <h1>Should you get a website or an app?</h1>
                    </div>
                    <div></div>
                </div>
            </div>
        </>
    );
}
