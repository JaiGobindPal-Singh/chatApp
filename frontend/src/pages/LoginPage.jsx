import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { NavLink } from 'react-router-dom'
const LoginPage = () => {
  const [formData,setFormData] = React.useState({
    email:'',
    password:''
  })
  const {login,isLoggingIn} = useAuthStore();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    login(formData) 
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" name="" placeholder='email enter here' id="" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
        
        <input type="password" name="" placeholder='password enter here' id="" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <button type="submit" disabled={isLoggingIn}>Login</button>
      </form>
      <div className='flex gap-5 mt-2'>
        new user 
        <NavLink className='bg-white px-5 text-black' to='/signup'>signup</NavLink>
      </div>
    </div>
  )
}

export default LoginPage
