import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Navbar = () => {
  const { authUser,logout } = useAuthStore()
  return (
    <div className='flex justify-between'>
      {!authUser ? <div className='bg-white text-black'>navbar</div>:<div className='bg-white text-black flex gap-10'>Navbar<button className='bg-white text-black' onClick={logout}>logout</button>
      <Link to="/profile" className="bg-white text-black">Profile</Link>
      
      </div>
      }
      <div>settings</div>
    </div>
  )
}

export default Navbar
