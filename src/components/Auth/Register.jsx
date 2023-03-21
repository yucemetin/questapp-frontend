import axios from 'axios'
import React, { useState } from 'react'
import { Link } from "react-router-dom"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function Register() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")
    const [openAlert, setOpenAlert] = useState(false);

    const handleRegister = () => {
        if (password === passwordAgain) {
            axios.post('http://localhost:8080/auth/register', {
                userName: username,
                password: password
            })
                .then(function (response) {
                    setOpenAlert(true)
                    setUsername("")
                    setPassword("")
                    setPasswordAgain("")
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    const handleAlert = () => {
        setOpenAlert(false);
    };

    return (
        <div className='px-40 py-20 w-full h-full flex flex-col gap-y-5 items-center'>
            <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} open={openAlert} autoHideDuration={2000} onClose={handleAlert}>
                <MuiAlert onClose={handleAlert} elevation={6} variant="filled" severity="success" sx={{ width: '100%' }}>
                    Register successfuly!
                </MuiAlert>
            </Snackbar>
            <div className='flex justify-between gap-x-4'>
                <input value={username} onChange={(e) => setUsername(e.target.value)} className='outline-0 rounded-lg p-1 placeholder:text-red-400 placeholder:font-bold shadow-2xl' placeholder='Username' type="text" />
            </div>
            <div className='flex justify-between gap-x-4'>
                <input value={password} onChange={(e) => setPassword(e.target.value)} className='outline-0 rounded-lg p-1 placeholder:text-red-400 placeholder:font-bold shadow-2xl' placeholder='Password' type="password" />
            </div>
            <div className='flex justify-between gap-x-4'>
                <input value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)} className='outline-0 rounded-lg p-1 placeholder:text-red-400 placeholder:font-bold shadow-2xl' placeholder='Password*' type="password" />
            </div>
            <p className='text-sm text-gray-700'>Have an account?  <Link className={"text-blue-700 font-bold"} to="/login">Login</Link></p>
            <button onClick={handleRegister} className='px-4 py-2 font-bold bg-red-400 text-white rounded-xl hover:bg-red-500'>Register</button>
        </div>
    )
}
