import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from './skeletons/SidebarSkeleton'
import { useAuthStore } from '../store/useAuthStore'
const Sidebar = () => {
  const {authUser} = useAuthStore()
  const { getUsers, users, setSelectedUser, isUsersLoading, selectedUser } = useChatStore()
  const {onlineUsers} = useAuthStore()
  useEffect(()=>{
    getUsers()
  },[])


  if(isUsersLoading){
    return <SidebarSkeleton />
  }
  return (
    <div>
      
      {users.map((user) => {
          return (
            <button
            key={user._id}
            className={` mt-5 w-60 flex items-center h-7 ${selectedUser?._id == user._id ? 'bg-blue-500' : ''}`}
            onClick={() => setSelectedUser(user)}>
              <div className="relative mx-0 border-0 rounded-4xl overflow-hidden w-7 h-7">
                <img src={user.profilePic || '/vite.svg'} alt="profileimg" />
              </div>
              <div className="ml-2">
                <p>{user.fullName}</p>
                {onlineUsers.includes(user._id) && <p>online</p>}
              </div>
          </button>
        )
      
      })}
      </div>
    )
}

export default Sidebar
