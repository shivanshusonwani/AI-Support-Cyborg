import express from 'express'
import { handleNewChat } from '../controllers/chat.controller.js'

const router = express.Router()

// POST    /api/chat/send
router.post('/send', handleNewChat)

export default router