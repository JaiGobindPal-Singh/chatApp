import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';



export const useAuthStore = create((set) => ({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    checkAuth:async ()=>{
        try{
            const res = await axiosInstance.get('/auth/check');
            set({authUser:res.data})
        }catch(err){
            console.log('error in checkAuth',err)
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },
    signup:async (data)=>{
        set({isSigningUp:true})
        try{
            const res = await axiosInstance.post('/auth/signup',data);
            toast.success('signup success');
            console.log(res.data)
            set({authUser:res.data})
        }catch(err){
            toast.error(err.response.data.message)
        }finally{
            set({isSigningUp:false})
        }
    },
    logout:async ()=>{
        try{
            await axiosInstance.post('/auth/logout');
            set({authUser:null})
            toast.success('logged out successfully')
        }catch(err){
            console.log('error in logout',err)
            toast.error(err.response.data.message)
        }
    },
    login:async (data)=>{
        set({isLoggingIn:true})
        try{
            const res = await axiosInstance.post('/auth/login',data);
            console.log(res.data)
            set({authUser:res.data})
            toast.success('login success')
        }catch(err){
            toast.error(err.response.data.message)
        }finally{
            set({isLoggingIn:false})
        }

    },
    updateProfile:async (data)=>{
        set({isUpdatingProfile:true})
        try{
            const res = await axiosInstance.put('/auth/update-profile',data);
            set({authUser:res.data})
            toast.success('profile updated')
        }catch(err){
            toast.error(err.response.data.message)
            console.log('error update profile',err)
        }finally{
            set({isUpdatingProfile:false})
        }
    }

}))