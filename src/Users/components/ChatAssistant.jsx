import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import SERVERURL from "../../Services/server";

function ChatAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const SERVER_URL = `${SERVERURL}/ask-ai`;

    // Scroll to bottom on new message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (!isOpen && messages.length === 0) {
            setMessages([{ sender: "bot", text: "Hi! How can I help you today?" }]);
        }
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        try {
            const response = await axios.post(SERVER_URL, { message: input });
            const botMessage = { sender: "bot", text: response.data.reply };
            setMessages((prev) => [...prev, botMessage]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "Oops! Something went wrong. Try again." },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            {/* Chat Button */}
            <button
                onClick={toggleChat}
                className="fixed bottom-5 chat-button right-5 bg-gray-300 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition text-3xl"
            >
                🤖
            </button>


            {/* Chat Window */}
            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-20 right-5 w-[90vw] sm:w-80 md:w-96 h-[500px] bg-white rounded-xl shadow-xl flex flex-col overflow-hidden">

                    {/* Header */}
                    <div className="bg-green-600 text-white p-4 font-semibold flex justify-between items-center">
                        HomeServe Chat
                        <button onClick={toggleChat} className="text-white font-bold">✕</button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex items-start gap-2 ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}
                            >
                                {msg.sender === "bot" && (
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg">
                                        🤖
                                    </div>
                                )}

                                <div
                                    className={`max-w-[70%] p-3 rounded-xl ${msg.sender === "bot"
                                            ? "bg-green-100 text-gray-800 rounded-tl-none"
                                            : "bg-blue-100 text-gray-800 rounded-tr-none"
                                        }`}
                                >
                                    {msg.text}
                                </div>

                                {msg.sender === "user" && (
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
                                        👤
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Typing indicator */}
                        {isTyping && (
                            <div className="flex items-start gap-2 justify-start">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg">
                                    🤖
                                </div>
                                <div className="max-w-[70%] p-3 rounded-xl bg-green-100 text-gray-800 rounded-tl-none">
                                    Typing...
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef}></div>
                    </div>

                    {/* Input Box */}
                    <div className="flex p-3 border-t border-gray-200 gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 border border-gray-300 rounded-xl p-2 focus:outline-none focus:border-green-600"
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}

        </>
    );
}

export default ChatAssistant;
