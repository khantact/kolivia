"use client";
import Link from "next/link";
import { useState } from "react";
import { query } from "../api/chat/modelResponse";
import SideNavBar from "@/components/sideNavBar";

const Testing = () => {
	const [messages, setMessages] = useState<
		{ text: string; sender: "user" | "bot" }[]
	>([]);
	const [input, setInput] = useState("");
	const [botResponse, setBotResponse] = useState("");

	const handleUserMessage = async () => {
		if (input.trim() !== "") {
			// Preserve existing messages and add the new user message
			setMessages((prevMessages) => [
				...prevMessages,
				{ text: input, sender: "user" },
			]);
			try {
				const response = await query({
					inputs: input,
					options: { wait_for_model: true },
				});
				console.log(JSON.stringify(response));
				setBotResponse(JSON.stringify(response));
			} catch (e) {
				console.error(e);
			}
			setInput("");
			setMessages((prevMessages) => [
				...prevMessages,
				{ text: botResponse, sender: "bot" },
			]);
			setBotResponse("");
		}
	};

	return (
		<div className="flex">
			<div className="w-1/6">
				<SideNavBar />
			</div>
			<div className="grow flex flex-col">
				<div className="bg-black grow p-4 h-3/4">
					<div className="overflow-auto h-full mb-8 border-white border">
						{messages.map((message, index) => (
							<div key={index} className="w-full">
								<div className="flex">
									<div
										className={
											message.sender === "user"
												? "m-4 flex rounded-lg bg-purple-300 text-white p-3"
												: "m-4 rounded-lg bg-red-200 p-3 text-black"
										}
									>
										{message.text}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="flex m-4">
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Type a message..."
						className="p-2 flex-grow border border-gray-300 rounded-l-lg text-black bottom-0"
					/>
					<button
						onClick={handleUserMessage}
						className="p-2 bg-blue-500 text-black rounded-r-lg"
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
};

export default Testing;
