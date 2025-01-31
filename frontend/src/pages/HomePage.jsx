import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import NoChatSelected from '../components/NoChatSelected'
const HomePage = () => {
  const { logout } = useAuthStore()
  const { selectedUser } = useChatStore()
  return (
    <div className='h-screen bg-gray-800 pt-5'>
      <div className="flex items-center justify-between pt20 px-4">
        <Sidebar />
        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </div>


    </div>
  )
}

export default HomePage
