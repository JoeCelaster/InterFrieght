import React from 'react';
// import Home from '../components/Home'
import Body from '../components/Body'
import hiwave from '../assets/wave.png'
import { Link, useLocation } from 'react-router-dom';
import { useEffect,useState } from 'react';

import Avatar from '../components/ProfileAvatar'
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ProfileAvatar from '../components/ProfileAvatar';

const Profile = () => {
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
        <div className='font-serif'>
            <nav className="hidden sm:block fixed top-0 left-0 w-full z-20 shadow-md transition-all duration-500 bg-blue-500 p-4">
                <div className="max-w-6xl mx-auto flex items-center justify-start font-serif font-light tracking-wide">
                    <div className=" text-xl text-white">
                        <h2>Inter Freight Forwarders</h2>
                    </div>
                    <ul className="list-none flex gap-8 text-white font-medium ml-auto">
                        <Link to='/' className="relative inline-block cursor-pointer after:content-[''] after:block after:absolute after:bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-orange-400 after:transition-all after:duration-300 hover:after:w-full">Home</Link>
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

           
            <div className="flex flex-col items-center gap-12 p-8 bg-gray-50 border-2 border-gray-300 rounded-2xl mt-24">
               
                <h1 className="text-5xl lg:text-6xl font-light tracking-wide text-gray-800">
                    Welcome <span className="text-indigo-500 underline underline-offset-2 decoration-2">{Profile?.FirstName}</span>!
                </h1>

                <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 border-2">
                    <h2 className="text-3xl font-semibold text-gray-900 border-b pb-4 mb-6">
                        Stats Overview
                    </h2>
                    <ul className="space-y-4 text-lg text-gray-700">
                        <li className="flex justify-between border-b pb-2 bg-green-200 rounded-lg p-2">
                            <span className="font-medium">Shipments In Progress</span>
                            <span className="font-semibold text-black">3</span>
                        </li>
                        <li className="flex justify-between border-b pb-2 bg-red-200 rounded-lg p-2">
                            <span className="font-medium">Delayed Shipments</span>
                            <span className="font-semibold text-red-500">1</span>
                        </li>
                        <li className="flex justify-between border-b pb-2 bg-yellow-200 rounded-lg p-2">
                            <span className="font-medium">Cleared Shipments</span>
                            <span className="font-semibold text-black">4</span>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col items-center justify-center w-full h-80 bg-white shadow rounded-xl p-4 border-2 border-gray-300">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Shipment Trends</h2>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="shipments" stroke="#3B82F6" strokeWidth={3} dot={{ r: 5 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
                
export default Profile;
