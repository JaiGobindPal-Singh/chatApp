import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import MessageInput from './MessageInput'
const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore()
  const { authUser } = useAuthStore()
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id)
    }
  }, [selectedUser])
  if (isMessagesLoading) {
    return <p>Loading...</p>
  }
  // console.log(messages, 'messages')
  return (
    <div className='w-3/4 h-5/6 bg-gray-800 rounded-lg'>
      {
        messages.map((message) => {
         
          if (message.senderId == authUser._id) {
            return (
              <div key={message._id} className="flex justify-end">
                <div className="bg-blue-500 p-2 m-2 rounded-lg">
                  <p>{message.text}</p>
                  
                <img className='w-40 ' src={message.image} alt="" />
                </div>
              </div>
            )
          } else {
            return (
              <div key={message._id} className="flex justify-start">
                <div className="bg-gray-500 p-2 m-2 rounded-lg">
                  <p>{message.text}</p>
                  <img className='w-40' src={message.image} alt="" />
                </div>
              </div>
            )
          }
        })
      }
      <MessageInput/>
    </div>
  )
}

export default ChatContainer
