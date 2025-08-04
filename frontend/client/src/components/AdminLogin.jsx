import React, { useState } from 'react';
import Google from './ContinuewithGoogle'
import Apple from './ContinueWithApple'
import axios from 'axios';
import signup from './AdminSignup'

import { Link, useNavigate } from 'react-router-dom';


const AdminLogin = () => {
    
    const apiURL = import.meta.env.VITE_BACKEND_URL
    // const [profile,setProfile] = useState(null)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
    const [Loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.post(`${apiURL}/admin/login`, {email,password},{ withCredentials:true})
            console.log(res)
            navigate('/adminprofile', { state: { admin: res.data.data } })
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <div className='flex flex-col items-center font-serif justify-evenly min-h-screen bg-blue-500 px-4'>
            <div className={`flex flex-col  tracking-wider items-center font-serif text-white text-[25px] justify-evenly min-h-screen bg-blue-500 bg-opacity-85 px-4 ${Loading ? 'block' : 'hidden'} z-10 fixed top-0 left-0 right-0 bottom-0`}>
                {Loading ? <h1>Loading...</h1> : null}
            </div>
            <div>
                <h1 className='text-4xl text-white font-serif tracking-normal text-center mb-2'>ADMIN</h1>
                <h1 className='text-3xl text-white font-serif tracking-normal text-center'>Inter Freight Forwarders</h1>
            </div>
            <div className='w-full max-w-md space-y-8 border-solid border-2 p-5 border-black inline-block bg-white rounded-xl shadow-2xl'>
                        <div className='flex-row space-y-2 font-serif'>
                        <h2 className='text-center font-light text-3xl '>Welcome Again !</h2>
                        </div>
                        <hr />
                        
                        <form  action="" onSubmit={handleLogin} className='space-y-6'>
                            {/* <h1 className='font-bold text-center text-4xl'>SignUp</h1> */}
                            <div className='space-y-4'>
                            <Google/>
                            <Apple/>
                            </div>
                            <div className='space-y-6'>
                                <div className='flex gap-6 justify-around'>
                                </div>
                               
                                <input required className= 'w-full bg-gray-300 border-black border-solid border-2 p-3 rounded-[5px] placeholder-gray-500' onChange={(e) => setEmail(e.target.value)} value={email} type="text" name="" id="" placeholder='Email'/><br />
                                <input required className= 'w-full bg-gray-300 border-black border-solid border-2 p-3 rounded-[5px] placeholder-gray-500' onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="" id="" placeholder='Password'/><br />
                                <div>
                                </div>
                            </div>
                            <div>
                                <button className='w-full text-center border-black border-solid border-2 bg-blue-500 rounded-xl p-2 text-white font-light tracking-wide' >Login</button>
                            </div>
                        </form>
                            <div className='space-y-2 text-sm'>
                                <h2 className='text-center underline cursor-pointer'>Forgot Password?</h2>
                                <Link to='/adminsignup'>
                                <h2 className='text-center underline cursor-pointer'>New to IFF? Please Signup here</h2>
                                </Link>
                            </div>
                    </div>
        
                    {/* <div className="w-1/2 h-screen relative bg-white">
          <div className="absolute inset-0 clip-left-border border-l-[10px] border-black"></div>
          <div className="relative z-10 p-6">
            Welcome to IFF
          </div>
        </div> */}
        
                </div>
        // </div>
    );
}

export default AdminLogin;
