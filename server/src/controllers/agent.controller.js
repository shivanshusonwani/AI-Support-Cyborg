import Chat from '../models/chat.model.js'
import Message from '../models/message.model.js'

export const getDashboardStats = async (req, res) => {
    try {
        const chats = await Chat.find()
            .sort({ currentConfidence: 1, updatedAt: -1 })
            .limit(20)

        res.status(200).json(chats)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch dashboard data" })
    }
}

export const getChatDetails = async (req, res) => {
    try {
        const { chatId } = req.params;

        const messages = await Message
            .find({ chatId })
            .sort({ createdAt: 1 })

        const chatDetails = await Chat.findById(chatId)

        res.status(200).json({
            meta: chatDetails,
            history: messages
        })
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch chat details" })
    }
}

export const agentReply = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { content } = req.body;

        const message = await Message.create({
            chatId,
            role: 'model',
            content,
            confidenceScore: 1.0
        })

        await Chat.findByIdAndUpdate(chatId, {
            status: 'open',
            currentConfidence: 1.0
        })

        res.status(201).json(message)
    } catch (error) {
        res.status(500).json({ error: "Agent reply failed" });
    }
}

export const resolveChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        await Chat.findByIdAndUpdate(chatId, { status: 'resolved' });
        res.status(200).json({ message: "Chat marked as resolved" });
    } catch (error) {
        res.status(500).json({ error: "Failed to resolve chat" });
    }
}