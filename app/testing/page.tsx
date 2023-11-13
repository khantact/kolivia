"use client";
import { useState } from "react";

const Testing = () => {
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "bot" }[]
  >([]);
  const [input, setInput] = useState("");

  const handleUserMessage = () => {
    if (input.trim() !== "") {
      // Preserve existing messages and add the new user message
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: "user" },
      ]);
      setInput("");

      // Simulate a bot response
      // TODO: replace this with api call to llama
      setTimeout(() => {
        // Preserve existing messages and add the new bot response
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "This is a bot response", sender: "bot" },
        ]);
      }, 1000); // Simulate a bot response after a 1-second delay
    }
  };

  return (
    <div className="p-4">
      <div className="border border-gray-300 p-4 rounded-lg h-96">
        <div className="overflow-y-auto h-full">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`text-${message.sender === "user" ? "right" : "left"}`}
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
  );
};

export default Testing;
