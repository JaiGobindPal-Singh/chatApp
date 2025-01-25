import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    //ref refers to the model that the id refers to
    //type: mongoose.Schema.Types.ObjectId refers to the type of the _id field in the User model
    text:{
        type: String,
    },
    image:{
        type: String,
    }
},
{timestamps: true});

const Message = mongoose.model('Message', messageSchema);
export default Message;