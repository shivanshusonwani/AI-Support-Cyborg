import express from 'express'
import { getDashboardStats, getChatDetails, agentReply, resolveChat } from '../controllers/agent.controller.js'
import { protect, authorizeAgent} from '../middlewares/auth.middleware.js'

const router = express.Router()

router.use(protect)
router.use(authorizeAgent)

router.get("/chats", getDashboardStats)

router.get('/chats/:chatId', getChatDetails)

router.post('/chats/:chatId/reply', agentReply)

router.patch('/chats/:chatId/resolve', resolveChat)

export default router;