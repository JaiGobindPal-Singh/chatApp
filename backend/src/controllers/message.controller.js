import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({_id: { $ne: loggedInUser }}).select('-password');
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log('error in getUsersForSidebar', error.message);
        res.status(500).json({ message: error.message });
    }
}
export const getMessages = async (req, res) => {
    try{
        //fetching the userid and the user to chat id
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        //fetching messages from the database
        const messages = await Message.find({
            $or:[
                {senderId: senderId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: senderId}
            ]
        })
        return res.status(200).json(messages);
    }catch(err){
        console.log('error in getMessages controller', err.message)
        res.status(500).json({message: 'Internal server error',error:err.message})
    }
}
export const sendMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        const { text, image } = req.body;
        //saving the image to cloudinary and getting the url in imageURL
        let imageURL;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageURL = uploadResponse.secure_url;
        }
        //saving the message to the database
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageURL
        });
        await newMessage.save();

        //todo:realtime functionality here

        return res.status(201).json(newMessage);
    } catch (error) {
        console.log('error in sendMessage controller', error.message);
        res.status(500).json({ message: error.message });
    }
}