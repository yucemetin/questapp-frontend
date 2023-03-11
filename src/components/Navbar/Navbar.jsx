import React from 'react'
import { NavLink } from "react-router-dom"

export default function Navbar() {

    const userId = 1;
    const activeClassName = "text-white font-bold"
    const unActiveClassName = "font-bold hover:text-white text-link"

    return (
        <nav className='w-full bg-navbar p-4 shadow-2xl'>
            <ul className='flex gap-x-10'>
                <li>
                    <NavLink to="/" className={({ isActive }) =>
                        isActive ? activeClassName : unActiveClassName
                    }>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/users/${userId}`} className={({ isActive }) =>
                        isActive ? activeClassName : unActiveClassName
                    }>
                        Profile
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
