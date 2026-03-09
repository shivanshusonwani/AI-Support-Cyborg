import Chat from '../models/chat.model.js'
import Message from '../models/message.model.js'
import { analyseAndRespond } from '../services/cyborg.js'

export const handleNewChat = async (req, res) => {
    try {
        const { chatId, messageContent } = req.body
        const chat = await Chat.findById(chatId)

        if (!chat) return res.status(404).json({ error: "Chat not found" })

        const history = await Message.find({ chatId }).sort({ createdAt: -1 }).limit(10)
        const aiResult = await analyseAndRespond(history, messageContent)

        await Message.create({ chatId, role: 'user', content: messageContent })

        const aiMessage = await Message.create({
            chatId,
            role: 'model',
            content: aiResult.answer,
            confidenceScore: aiResult.confidence
        })

        chat.summary = aiResult.summary
        chat.currentConfidence = aiResult.confidence
        await chat.save()

        res.json(aiMessage)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}