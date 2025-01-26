import React, { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import {Routes,Route, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { useAuthStore } from './store/useAuthStore.js'
import Loader from './components/Loader.jsx'
const App = () => {
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore()
  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  console.log({authUser})

  //loading screen 
  if(isCheckingAuth && !authUser){
    return <Loader/>
  }
  return (
    <div>
        <Navbar/>
        <Routes>
          //open the homepage if the user is authenticated else redirect to login page
          <Route path="/" element={authUser ?<HomePage/>:<Navigate to="/login"/>}/>
          <Route path="/signup" element={!authUser ? <SignUpPage/>:<Navigate to='/'/>}/>
          <Route path="/login" element={!authUser ? <LoginPage/>:<Navigate to='/'/>}/>
          <Route path="/settings" element={<SettingsPage/>}/>
          <Route path="/profile" element={authUser?<ProfilePage/>:<Navigate to="/login"/>}/>
        </Routes>
    </div>
  )
}

export default App
