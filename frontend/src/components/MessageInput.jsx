import React from 'react'
import { useState } from 'react'
import { useChatStore } from '../store/useChatStore'
const MessageInput = () => {
    const [Message, setMessage] = useState('')
    const {sendMessage} = useChatStore()
    const [Image, setImage] = useState('')

    const handleSendMessage = async (e)=>{
        e.preventDefault()
        if(Message.trim() || Image){
            sendMessage({text:Message,image:Image})
            setMessage('')
            setImage('')
        }
    }
    const handleImageChange = async (e)=>{
        e.preventDefault()
        const file = e.target.files[0]
        if(file && file.type.startsWith('image/')){
            const reader = new FileReader()
            reader.onloadend = () => {
                setImage(reader.result)
            }
            reader.onerror = () => {
                console.error('Error reading file')
                setImage('')
            }
            reader.readAsDataURL(file)
        } else {
            console.error('Please select an image file')
            setImage('')
        }
    }
return (
    <div className=' bg-gray-900'>
            <form onSubmit={handleSendMessage} className='flex gap-3'>
                <input className=' w-[80%] py-2  bottom-0 right-[200px]' type="text" name="" id="" value={Message} onChange={(e)=>{
                        setMessage(e.target.value)
                    }}
                    placeholder='enter text here'/>
                    <label htmlFor="filein">img</label>
                    <input 
                        type="file" 
                        name="filein" 
                        id="filein" 
                        className='hidden' 
                        // accept="image/*"
                        onChange={handleImageChange}
                    />
                    <button type='submit' className='bg-blue-500 py-2 px-3 rounded-lg'>send</button>
            </form>
    </div>
)
}

export default MessageInput
