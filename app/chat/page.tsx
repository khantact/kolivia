"use client";
import { useState, useEffect, useRef } from "react";
import { query } from "../api/chat/modelResponse";
import SideNavBar from "@/components/sideNavBar";
import { auth } from "@/utils/firebase/Firebase";
import { useRouter } from "next/navigation";
import SingleForecast from "@/components/singleForecast";
const Chat = () => {
	const [messages, setMessages] = useState<
		{ text: any; sender: "user" | "bot" }[]
	>([]);

	const [input, setInput] = useState("");
	const [botResponse, setBotResponse] = useState("");
	const [apiResponse, setApiResponse] = useState([{}]);
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [chatDisabled, setChatDisabled] = useState(false);

	const chatboxRef = useRef<HTMLDivElement>(null);
	const handleKeyPress = (e: any) => {
		if (e.key === "Enter" && !chatDisabled) {
			handleUserMessage();
		}
	};

	const handleUserMessage = async () => {
		if (input.trim() !== "") {
			setMessages((prevMessages) => [
				...prevMessages,
				{ text: input, sender: "user" },
			]);
			setChatDisabled(true);
			setLoading(true);

			try {
				const response = await query({
					inputs: input,
					options: { wait_for_model: true },
				});
				// json currently
				setApiResponse(response);
				setBotResponse("Haiiii");
			} catch (e) {
				console.error(e);
			}
			setLoading(false);
			setChatDisabled(false);
			setInput("");
		}
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (!user) {
				router.push("/login");
			}
		});

		return () => unsubscribe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (chatboxRef.current) {
			chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
		}
	}, [messages]);

	// useEffect(() => {
	// 	if (botResponse.trim() !== "") {
	// 		setMessages((prevMessages) => [
	// 			...prevMessages,
	// 			{ text: botResponse, sender: "bot" },
	// 		]);
	// 	}
	// }, [botResponse]);

	useEffect(() => {
		if (apiResponse.length > 1) {
			if (apiResponse.length > 1) {
				const forecastComponents = apiResponse.map(
					(forecastItem: any) => (
						<SingleForecast forecastData={forecastItem} />
					)
				);
				setMessages((prevMessages) => [
					...prevMessages,
					{ text: forecastComponents, sender: "bot" },
				]);
			} else {
				setMessages((prevMessages) => [
					...prevMessages,
					{ text: "No forecast data available", sender: "bot" },
				]);
			}
		}
	}, [apiResponse]);

	return (
		<div className="flex">
			<div className="">
				<SideNavBar />
			</div>
			<div className=" grow flex flex-col">
				<div className="bg-black grow p-4 relative">
					<div
						className="overflow-y-auto max-h-[calc(100vh-120px)] h-full scrollbar"
						ref={chatboxRef}
					>
						{messages.map((message, index) => (
							<div key={index} className="w-full">
								{message.sender === "user" ? (
									<div className="flex flex-row-reverse">
										<div className="m-4 text-wrap flex flex-row-reverse rounded-tl-lg rounded-br-lg rounded-bl-lg bg-purple-500 text-black p-4 max-w-[calc(50%-32px)]">
											{message.text}
										</div>
									</div>
								) : (
									<div className="flex">
										<div className="m-4 text-wrap rounded-tr-lg rounded-br-lg rounded-bl-lg bg-pink-500 p-4 text-black max-w-[calc(50%-32px)]">
											{/* {message.text} */}
											{/* this following code is just to show what a bot weather response should look like */}
											<div className="flex gap-5">
												{message.text}
											</div>
										</div>
									</div>
								)}
							</div>
						))}
						{loading ? (
							<div>
								<svg
									aria-hidden="true"
									className="w-8 m-4 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-pink-500"
									viewBox="0 0 100 101"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
										fill="currentColor"
									/>
									<path
										d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
										fill="currentFill"
									/>
								</svg>
							</div>
						) : null}
					</div>
				</div>
				<div className="flex m-4">
					<input
						type="text"
						onKeyDown={handleKeyPress}
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Type a message..."
						className="p-2 flex-grow border border-gray-300 rounded-l-lg text-black bottom-0"
						disabled={chatDisabled}
					/>
					<button
						onClick={handleUserMessage}
						className="p-4 bg-blue-500 text-black rounded-r-lg"
						disabled={chatDisabled}
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
};

export default Chat;
