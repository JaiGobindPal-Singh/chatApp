import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
    //function to get the users
    getUsers:async ()=>{
        set({isUsersLoading:true})
        try {
            const res = await axiosInstance.get('/message/users')
            set({users:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }finally {
            set({isUsersLoading:false})
        }
    },

    //function to get messages
    getMessages: async(userId)=>{
        set({isMessagesLoading:true})
        try {
            const res = await axiosInstance.get(`/message/${userId}`)
            set({messages:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }finally {
            set({isMessagesLoading:false})
        }
    },

    setSelectedUser:(user)=>{
        set({selectedUser:user})
    },

    sendMessage:async (messageData)=>{
        const {selectedUser,messages} = get()
        try{
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData)
            set({messages:[...messages,res.data]})
        }catch(err){
            toast.error(err.response.data.message)
        }
    }
}))