import { RiRobot3Fill, RiUser3Fill } from "react-icons/ri";

const MessageBubble = ({ msg }) => {
	const isUser = msg.role === "user";
	const isAgent = msg.role === "agent";
	const isAI = msg.role === "model";

	return (
		<div className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"}`}>
			<div
				className={`max-w-[70%] rounded-2xl p-4 shadow-sm ${
					isUser
						? "bg-violet-600 text-white rounded-tr-none"
						: isAgent
							? "bg-violet-100 border-2 border-violet-400 text-neutral-800 rounded-tl-none"
							: "bg-white border border-neutral-200 text-neutral-800 rounded-tl-none"
				}`}>
				<div className='flex items-center gap-2 text-xs font-bold opacity-70'>
					{isAI && (
						<>
							<RiRobot3Fill />
							AI ASSISTANT
						</>
					)}
					{isAgent && (
						<>
							<RiUser3Fill />
							SUPPORT AGENT
						</>
					)}
					{isUser && "You"}
				</div>
				<p>{msg.content}</p>
			</div>
		</div>
	);
};

export default MessageBubble;
