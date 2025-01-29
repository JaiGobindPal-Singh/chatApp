import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
const HomePage = () => {
  const { logout } = useAuthStore()
  return (
    <div>
      homepage
      <div>

      </div>
    </div>
  )
}

export default HomePage
