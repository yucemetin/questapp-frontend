import React from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar() {

    const activeClassName = "text-white font-bold"
    const unActiveClassName = "font-bold hover:text-white text-link"
    const navigate = useNavigate();


    const handleLogOut = () => {
        localStorage.removeItem("currentUser")
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("userName")
        navigate(0)

    }

    return (
        <nav className='w-full bg-navbar p-4 shadow-2xl fixed z-10 px-10'>
            <ul className='flex justify-between'>
                <li>
                    <NavLink to="/" className={({ isActive }) =>
                        isActive ? activeClassName : unActiveClassName
                    }>
                        Home
                    </NavLink>
                </li>
                <li>
                    {localStorage.getItem("currentUser") && (
                        <div className='flex justify-center items-center gap-x-5'>
                            <button onClick={handleLogOut}><LogoutIcon className='text-link hover:text-white' /></button>
                            <NavLink to={`/users/${localStorage.getItem("currentUser")}`} className={({ isActive }) =>
                                isActive ? activeClassName : unActiveClassName
                            }>
                                Profile
                            </NavLink>
                        </div>

                    )}
                    {!localStorage.getItem("currentUser") && (
                        <NavLink to={`/login`} className={({ isActive }) =>
                            isActive ? activeClassName : unActiveClassName
                        }>
                            Login
                        </NavLink>
                    )}
                </li>
            </ul>
        </nav>
    )
}
