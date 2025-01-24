import express from 'express';
import authRoutes from './routes/auth.route.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import { connectDB } from './lib/db.js';
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cookieParser())
app.use(express.json());
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:'+PORT);
  connectDB();
});
