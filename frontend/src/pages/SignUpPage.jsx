import React from 'react'
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();
  const validateForm = () => {
    if (formData.fullName.trim() === '') {
      return toast.error('fullName is required')
    } else if (formData.email.trim() === '') {
      return toast.error('email is required')
    } else if (formData.password.trim() === '') {
      return toast.error('password is required')
    } else if(formData.password.length < 6){
      return toast.error('password must be atleast 6 characters')
    }else{
      return true
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success) {
      signup(formData)
    }
  }
  return (
    <div>
      <div>
        create account
      </div>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">full Name</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            </div>
            <input type="text" className={'input input-bordered w-full pl-10'} placeholder='fullName' value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
            <input  type="email" className={'input input-bordered w-full pl-10'} placeholder='email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <div className="flex">

              <input type={showPassword ? "text" : "password"} className={'input input-bordered w-full pl-10'} placeholder='password' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              <button type='button' onClick={() => { setShowPassword(!showPassword) }}>{showPassword ? 'hide' : 'see'}</button>
            </div>
          </div>
        </div>
        <button type='submit' className='btn btn-primary' disabled={isSigningUp}
        >create account</button>
      </form>
      <div className='flex items-center gap-5 text-gray-400'>
        already have account
        <NavLink to='/login' className='bg-white px-5 text-black font-semibold'>login</NavLink>
      </div>

    </div>
  )
}

export default SignUpPage
