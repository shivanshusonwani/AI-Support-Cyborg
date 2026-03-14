import { useState, useEffect } from "react";
import api from "../api";
import MessageBubble from "../components/MessageBubble";

const UserDashboard = () => {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [chatId, setChatId] = useState(localStorage.getItem("activeChatId"));

	useEffect(() => {
		const startChat = async () => {
			if (!chatId) {
				const { data } = await api.post("/chat/create");
				localStorage.setItem("activeChatId", data._id);
				setChatId(data._id);
			} else {
				const { data } = await api.get(`/chat/history/${chatId}`);
				setMessages(data);
			}
		};
		startChat();
	}, []);

	const send = async (e) => {
		e.preventDefault();
		const { data } = await api.post("/chat/send", {
			chatId,
			messageContent: input,
		});
		setMessages((prev) => [...prev, { role: "user", content: input }, data]);
		setInput("");
	};

	return (
		<div className='h-screen flex justify-center items-center p-8'>
			<div className='flex flex-col h-full w-xl max-w-2xl mx-auto border'>
				<h2 className='font-bold text-2xl border-b border-b-black p-4  text-violet-600'>
					AI Support Chatbot
				</h2>
				<div className='flex-1 overflow-y-auto p-4'>
					{messages.map((m, i) => (
						<MessageBubble
							key={i}
							msg={m}
						/>
					))}
				</div>
				<form
					onSubmit={send}
					className='flex gap-2 p-4'>
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className='flex-1 p-2 border rounded-lg'
						placeholder='Ask anything...'
					/>
					<button className='bg-violet-600 text-white px-6 py-2 rounded-lg'>
						Send
					</button>
				</form>
			</div>
		</div>
	);
};

export default UserDashboard;
