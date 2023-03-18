import React from 'react'
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import { red } from '@mui/material/colors';
import { NavLink } from "react-router-dom"

export default function Comment(props) {
  const { userName, text, userId } = props
  return (
    <CardContent className='flex gap-x-4 border-b-2'>
      <div className='flex justify-center items-center content-center'>
        <NavLink to={`/users/${userId}`}>
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {userName.charAt(0)?.toUpperCase()}
          </Avatar>
        </NavLink>
      </div>
      <div className='flex items-center text-center content-center'>
        <p className=''>{text}</p>
      </div>
    </CardContent>

  )
}
