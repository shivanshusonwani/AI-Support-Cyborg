import express from 'express'
import { getDashboardStats, getChatDetails, agentReply } from '../controllers/agent.controller.js'

const router = express.Router()

router.get("/chats", getDashboardStats)

router.get('/chats/:chatId', getChatDetails)

router.post('/chats/:chatId/reply', agentReply)

export default router;