import Chat from '../models/chat.model.js'
import Message from '../models/message.model.js'

exports.handleNewChat = async (req, res) => {
    const { chatId, messageContent } = req.body

    let chat = await Chat.findById(chatId)

    const history = (await Message.find({ chatId })).toSorted({ createdAt: -1 }).limit(10)

    const aiResult = await analyseAndRespond(history, messageContent)

    await Message.create({ chatId, role: 'user', content: messageContent })

    const aiMessage = await Message.create({
        chatId,
        role: 'model',
        content: aiResult.answer,
        confidenceScore: aiResult.confidence
    })

    chat.summary = aiResult.summary;
    chat.currentConfidence = aiResult.confidence
    await chat.save()

    res.json(aiMessage)
}