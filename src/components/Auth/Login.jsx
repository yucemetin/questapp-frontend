import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleLogin = () => {
        axios.post('http://localhost:8080/auth/login', {
                userName: username,
                password: password
            })
                .then(function (response) {
                    navigate("/");
                })
                .catch(function (error) {
                    console.log(error);
                });
    }

    return (
        <div className='px-40 py-20 w-full h-full flex flex-col gap-y-5 items-center'>
            <div className='flex justify-between gap-x-4'>
                <input value={username} onChange={(e) => setUsername(e.target.value)} className='outline-0 rounded-lg p-1 placeholder:text-red-400 placeholder:font-bold shadow-2xl' placeholder='Username' type="text" />
            </div>
            <div className='flex justify-between gap-x-4'>
                <input value={password} onChange={(e) => setPassword(e.target.value)} className='outline-0 rounded-lg p-1 placeholder:text-red-400 placeholder:font-bold shadow-2xl' placeholder='Password' type="password" />
            </div>
            <p className='text-sm text-gray-700'>Don't have an account?  <Link className={"text-blue-700 font-bold"} to="/register">Register</Link></p>
            <button onClick={handleLogin} className='px-4 py-2 font-bold bg-red-400 text-white rounded-xl hover:bg-red-500'>Login</button>
        </div>
    )
}
