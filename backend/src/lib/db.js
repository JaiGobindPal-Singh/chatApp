import mongoose from 'mongoose';

export const connectDB = async () => {
    try {

        const conn = await mongoose.connect(process.env.MONGO_URI);
    } catch (err) {
        console.log('mongodb connection error: ', err);
    }
};