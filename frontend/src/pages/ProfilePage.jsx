import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import Loader from '../components/Loader'

const ProfilePage = () => {
    const {authUser,isUpdatingProfile,updateProfile} = useAuthStore()
    const [uploadedImage, setUploadedImage] = React.useState(null);
    const handleImageUpload = (e) => {
        //retrive the first file if multiple files are uploaded else retrive the only file
        const file = e.target.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async ()=>{
            const base64Image = reader.result;
            setUploadedImage(base64Image);
            await updateProfile({profilePic:base64Image})
        }

    }
    return (
        <div className='h-screen pt-20'>
            <div className="max-w-2xl mx-auto p-4 py-8">
                <div className="bg-base-300 rounded-xl p-6 space-y-8">
                    profile page

                    {/* profile pic section  */}
                    <div className="relative">
                        {isUpdatingProfile?<Loader/>:<img src={uploadedImage ||authUser.profilePic || "/vite.svg"} alt="profile pic" />}
                        
                        <label htmlFor="imageUpload">upload</label>
                        <input 
                        disabled={isUpdatingProfile}
                        className='opacity-0' type="file" name="imageUpload" id="imageUpload" onChange={handleImageUpload} />
                    </div>
                    
                    {/* name section */}
                    <div className='flex flex-col'>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" value={authUser.name} />
                        member since {authUser.createdAt?.split('T')[0]}
                        </div>

                </div>
            </div>
        </div>
    )
}

export default ProfilePage
