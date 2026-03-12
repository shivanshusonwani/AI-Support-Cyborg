import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";
import { analyseAndRespond } from "../services/cyborg.js";

export const createChat = async (req, res) => {
	try {
		const newChat = await Chat.create({
			userId: req.user.id,
			customerEmail: req.user.email,
			status: "open",
			summary: "New Inquiry",
			currentConfidence: 1.0,
		});

		res.status(201).json(newChat);
	} catch (error) {
		res.status(500).json({ error: "Could not initialize chat" });
	}
};

export const handleNewChat = async (req, res) => {
	try {
		const { chatId, messageContent } = req.body;
		const chat = await Chat.findById(chatId);

		if (!chat) return res.status(404).json({ error: "Chat not found" });

		if (!messageContent || messageContent.trim() === "") {
			const welcomeMessage =
				"Hello! I'm your CloudKeep AI assistant. How can I help you with your storage today?";

			const aiMessage = await Message.create({
				chatId,
				role: "model",
				content: welcomeMessage,
				confidenceScore: 1.0,
			});

			return res.json(aiMessage);
		}

		const history = await Message.find({ chatId })
			.sort({ createdAt: -1 })
			.limit(10);
		const aiResult = await analyseAndRespond(history, messageContent);

		await Message.create({ chatId, role: "user", content: messageContent });

		const aiMessage = await Message.create({
			chatId,
			role: "model",
			content: aiResult.answer,
			confidenceScore: aiResult.confidence,
		});

		chat.summary = aiResult.summary;
		chat.currentConfidence = aiResult.confidence;

		if (aiResult.isResolved) {
			chat.status = "resolved";
		} else if (aiResult.confidence < 0.4) {
			chat.status = "flagged";
		} else {
			chat.status = "open";
		}

		await chat.save();

		res.json(aiMessage);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const getMyChatHistory = async (req, res) => {
	try {
		const { chatId } = req.params;

		const chat = await Chat.findOne({ _id: chatId, userId: req.user.id });
		if (!chat)
			return res.status(404).json({ error: "Chat not found or unauthorized" });

		const messages = await Message.find({ chatId }).sort({ createdAt: 1 });

		res.status(200).json(messages);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch history" });
	}
};
