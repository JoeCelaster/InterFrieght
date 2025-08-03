import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileAvatar from './ProfileAvatar';
import { AiOutlineCloudUpload } from 'react-icons/ai';

const UserNavbar = () => {
    const location = useLocation();
    const [Profile, setProfile] = useState(location.state?.user || {});
    const [dropped, setDropped] = useState(false);
    const apiURL = import.meta.env.VITE_BACKEND_URL;
    const data = [
        { name: "Jan", shipments: 3 },
        { name: "Feb", shipments: 6 },
        { name: "Mar", shipments: 2 },
        { name: "Apr", shipments: 7 },
        { name: "May", shipments: 4 },
    ];

    useEffect(() => {
        if (!location.state?.user) {
            axios.get(`${apiURL}/users/profile`, { withCredentials: true })
                .then((res) => { setProfile(res.data.user) })
                .catch((err) => { console.error('Error fetching profile', err) })
        }
    }, [apiURL, location.state]);

    const handleDropDown = () => {
        setDropped((prev) => !prev);
    };

    return (
        <div>
            <nav className="hidden sm:block fixed top-0 left-0 w-full z-20 shadow-md transition-all duration-500 bg-blue-500 p-4">
                <div className="max-w-6xl mx-auto flex items-center justify-start font-serif font-light tracking-wide">
                    <div className=" text-xl text-white">
                        <h2>Inter Freight Forwarders</h2>
                    </div>
                    <ul className="list-none flex gap-8 text-white font-medium ml-auto">
                        <Link to='/profile' className="relative inline-block cursor-pointer after:content-[''] after:block after:absolute after:bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-orange-400 after:transition-all after:duration-300 hover:after:w-full">Back to profile</Link>
                        <Link to='/tracker' className="relative inline-block cursor-pointer after:content-[''] after:block after:absolute after:bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-orange-400 after:transition-all after:duration-300 hover:after:w-full">Track your Shipment</Link>
                        <Link to='/shipment' className="relative inline-block cursor-pointer after:content-[''] after:block after:absolute after:bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-orange-400 after:transition-all after:duration-300 hover:after:w-full">Start a new Shipment</Link>
                        <Link to='/profile' className="relative inline-block cursor-pointer after:content-[''] after:block after:absolute after:bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-orange-400 after:transition-all after:duration-300 hover:after:w-full"><ProfileAvatar/></Link>
                    </ul>
                </div>
            </nav>
            <nav className={`sm:hidden fixed top-0 left-0 w-full shadow-md transition-all duration-500 z-20 ${dropped ? "flex flex-col gap-6" : "none"} bg-blue-500 p-4bg-white-400 z-50 backdrop-blur-md p-4`}>
                <div className='flex flex-row items-center justify-between'>
                    <div className="font-serif font-thin text-xl text-white">
                        <h2>Inter Freight Forwarders</h2>
                    </div>
                    <div>
                        <button className='text-white text-2xl tracking-wide' onClick={handleDropDown}>≣</button>
                    </div>
                </div> 
                <div>
                    <ul className={`font-serif list-none flex flex-col justify-start transition-all duration-200 ease-in-out gap-3 text-white font-medium text-lg ml-auto ${dropped ? "opacity-100 max-h-96" : "gap-6 opacity-0 max-h-0 overflow-hidden"} `}>
                        <Link to='/' className="hover:text-gray-200 cursor-pointer">Home</Link><hr className='border-none bg-neutral-400 opacity-45 h-[0.5px]' />
                        <Link to='/tracker' className="hover:text-gray-200 cursor-pointer">Track your Shipment</Link><hr className='border-none bg-neutral-400 opacity-45 h-[0.5px]' />
                        <Link to='/shipment' className="hover:text-gray-200 cursor-pointer">Start a new Shipment</Link><hr className='border-none bg-neutral-400 opacity-45 h-[0.5px]' />
                        <Link to='/profile' className="hover:text-gray-200 cursor-pointer">Your Profile</Link>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default UserNavbar;
