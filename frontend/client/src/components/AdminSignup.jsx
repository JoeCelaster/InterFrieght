import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../App.css'
import Google from '../components/ContinuewithGoogle'
import Apple from '../components/ContinueWithApple'
import axios from 'axios';


const AdminSignup = () => {

    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    // const [name,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const navigate = useNavigate()
    
    
    const handleSignup = async (e) => {
        const apiURL = import.meta.env.VITE_BACKEND_URL;
        console.log("Api:",apiURL)
        e.preventDefault();
        try {
        const res = await axios.post(`${apiURL}/admin/register`, {FirstName,LastName,email,password},{ withCredentials:true});
        
        console.log(res.data)
        navigate('/adminprofile', { state: { admin: res.data.admin } })
        
        // navigate('/profile')
        // navigate('/login');
    } catch (error) {
        console.log(error)
        alert('Signup Failed');
    }
};


    return (
        <div className='flex flex-col items-center font-serif justify-evenly min-h-screen bg-blue-500'>
            <h1 className='text-3xl text-white font-serif tracking-normal' >Inter Freight Forwarders</h1>
            <div className='z-10 space-y-7 border-solid border-2 p-5 border-black inline-block  bg-white  rounded-xl w-[450px] h-[800px] shadow-2xl'>
                <div className='flex-row space-y-2 font-serif'>
                <h2 className='text-center font-light text-3xl '>Sign up</h2>
                <h2 className='text-[12px] font-thin text-center tracking-wider'>- Simplify your world. It starts here.</h2>
                </div>
                <hr />
                
                <form onSubmit={handleSignup} action="" className='space-y-10'>
                    {/* <h1 className='font-bold text-center text-4xl'>SignUp</h1> */}
                    <div className='space-y-4'>
                    <Google/>
                    <Apple/>
                    </div>
                    <div className='space-y-7'>
                        <div className='flex gap-6 justify-around'>
                            <input required className= 'w-[191px] bg-gray-300 border-black border-solid border-2 p-3 rounded-[5px] placeholder-gray-500' onChange={(e) => setFirstName(e.target.value)} value={FirstName} type="text" name="" id="" placeholder='First Name'/>
                            <input required className= 'w-[191px] bg-gray-300 border-black border-solid border-2 p-3 rounded-[5px] placeholder-gray-500' onChange={(e) => setLastName(e.target.value)} value={LastName} type="text" name="" id="" placeholder='Last Name'/><br />
                        </div>
                        
                        <input required className= 'w-full bg-gray-300 border-black border-solid border-2 p-3 rounded-[5px] placeholder-gray-500' onChange={(e) => setEmail(e.target.value)} value={email} type="text" name="" id="" placeholder='Email'/><br />
                        <input required className= 'w-full bg-gray-300 border-black border-solid border-2 p-3 rounded-[5px] placeholder-gray-500' onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="" id="" placeholder='Password'/><br />
                        <div>
                        <input required className= {`w-full bg-gray-300 p-3 rounded-[5px] border-black border-solid border-2 placeholder-gray-500 ${confirmPassword !== password ? "border-red-500 border-solid border-2" :  "border-black border-solid border-2"}`} onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type="password" name="" id="" placeholder='Confirm Password'/>
                        <h5 className='text-sm text-red-600'>{confirmPassword === password ? " " : "*Passwords don't match"}</h5>
                        </div>
                    </div>
                    <div>
                        <button className='w-full text-center border-black border-solid border-2 bg-blue-500 rounded-xl p-2 text-white font-light tracking-wide'>Sign up</button>
                    </div>
                </form>
                    <div className='space-y-2 text-sm'>
                        <h2 className='text-center underline cursor-pointer'>Forgot Password?</h2>
                        <Link to='/login'>
                        <h2 className='text-center underline cursor-pointer'>Already have an account?</h2>
                        </Link>
                    </div>
            </div>

            

        </div>
    );
}

export default AdminSignup;
