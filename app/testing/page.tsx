"use client";
import Link from "next/link";
import { useState } from "react";
import { query } from "../api/chat/modelResponse";

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
    <>
      <div className="header">
        <h1 className="text-4xl font-bold" style={{ padding: 15 }}>
          <Link href="/">KOlivia</Link>
        </h1>
      </div>
      <div className="p-4">
        <div className="border border-gray-300 p-4 rounded-lg h-96">
          <div className="overflow-y-auto h-full">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`text-${
                  message.sender === "user" ? "right" : "left"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="p-2 flex-grow border border-gray-300 rounded-l-lg text-black"
          />
          <button
            onClick={handleUserMessage}
            className="p-2 bg-blue-500 text-black rounded-r-lg"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Testing;
