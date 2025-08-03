import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../App.css'
import Google from '../components/ContinuewithGoogle'
import Apple from '../components/ContinueWithApple'
import axios from 'axios';


const Signup = () => {

    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    // const [name,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const navigate = useNavigate()
    const apiURL = import.meta.env.VITE_BACKEND_URL;
    console.log("Api:",apiURL)

    
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
        const res = await axios.post(`${apiURL}/users/register`, {FirstName,LastName,email,password},{withCredentials: true});
        console.log(res.data);
        // if (res.data.success){
            //     }
        // console.log(res.data)
        navigate('/profile', { state: { user: res.data.user } })
        
        // navigate('/profile')
        // navigate('/login');
    } catch (error) {
        
        alert(error.response?.data?.msg || 'Signup Failed');
    }
};


    return (
        <div className='flex flex-col items-center font-serif justify-evenly min-h-screen bg-blue-500 px-4'>
            <h1 className='text-3xl text-white font-serif tracking-normal ' >Inter Freight Forwarders</h1>
            <div className='w-full max-w-md z-10 space-y-7 border-solid border-2 p-6 border-black bg-white rounded-xl shadow-2xl'>
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
                        <div className='flex flex-col sm:flex-row gap-4 '>
                            <input required className= 'w-full sm-w:1/2 bg-gray-300 border-black border-solid border-2 p-3 rounded-[5px] placeholder-gray-500' onChange={(e) => setFirstName(e.target.value)} value={FirstName} type="text" name="" id="" placeholder='First Name'/>
                            <input required className= 'w-full sm-w:1/2 bg-gray-300 border-black border-solid border-2 p-3 rounded-[5px] placeholder-gray-500' onChange={(e) => setLastName(e.target.value)} value={LastName} type="text" name="" id="" placeholder='Last Name'/>
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

            {/* <div className="w-1/2 h-screen relative bg-white">
  <div className="absolute inset-0 clip-left-border border-l-[10px] border-black"></div>
  <div className="relative z-10 p-6">
    Welcome to IFF
  </div>
</div> */}

        </div>
    );
}

export default Signup;
