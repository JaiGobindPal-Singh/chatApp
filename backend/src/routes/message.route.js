import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getUsersForSidebar } from '../controllers/message.controller.js';
import { getMessages,sendMessage } from '../controllers/message.controller.js';

const router = express.Router();

//get all the users from database
router.get('/users',protectRoute,getUsersForSidebar)

//get all the messages of the user
router.get('/:id',protectRoute, getMessages)

//send message to the user
router.post('/send/:id',protectRoute,sendMessage)

export default router;