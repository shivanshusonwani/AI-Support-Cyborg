import express from 'express'
import { getDashboardStats, getChatDetails, agentReply, resolveChat } from '../controllers/agent.controller.js'

const router = express.Router()

router.get("/chats", getDashboardStats)

router.get('/chats/:chatId', getChatDetails)

router.post('/chats/:chatId/reply', agentReply)

router.patch('/chats/:chatId/resolve', resolveChat)

export default router;