import React, { useState, useRef, useEffect } from "react";
import type { ChatMessage, Tank } from "../types";
import { TankService } from "../services/tankService";
import { getClarifyingResponse } from "../services/geminiService";

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tanks, setTanks] = useState<Tank[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const fetchTanks = async () => {
    try {
      const fetchedTanks = await TankService.getAllTanks();
      setTanks(fetchedTanks);
    } catch (error) {
      console.error("Error fetching tanks for chat:", error);
      // Use empty array if fetch fails
      setTanks([]);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newUserMessage: ChatMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, newUserMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      // Fetch latest tank data before sending to AI
      await fetchTanks();
      const responseText = await getClarifyingResponse(tanks, userInput);
      const assistantMessage: ChatMessage = {
        sender: "assistant",
        text: responseText,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        sender: "assistant",
        text: "Lo siento, no pude conectar con el asistente.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          sender: "assistant",
          text: "¡Hola! Soy tu asistente de bodega. ¿En qué puedo ayudarte hoy?",
        },
      ]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (isOpen) {
      fetchTanks();
    }
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed bottom-0 right-0 m-6 transition-all duration-300 ${
          isOpen ? "w-full max-w-md h-3/4" : "w-16 h-16"
        } z-50`}
      >
        {isOpen ? (
          <div className="flex flex-col h-full bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-lg shadow-2xl">
            <header className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-amber-400">
                Asistente de Bodega
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
            </header>
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="flex flex-col space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-end gap-2 ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.sender === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center font-bold text-gray-900 text-sm flex-shrink-0">
                        IA
                      </div>
                    )}
                    <div
                      className={`max-w-xs md:max-w-sm lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.sender === "user"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-gray-700 text-gray-200 rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-end gap-2 justify-start">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center font-bold text-gray-900 text-sm flex-shrink-0">
                      IA
                    </div>
                    <div className="max-w-xs px-4 py-2 rounded-lg bg-gray-700 text-gray-200 rounded-bl-none">
                      <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-gray-700"
            >
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Pregunta sobre los tanques..."
                  className="w-full bg-gray-800 border border-gray-600 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !userInput.trim()}
                  className="bg-amber-500 text-gray-900 rounded-full p-2.5 hover:bg-amber-400 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-gray-900 shadow-lg hover:bg-amber-400 transform hover:scale-110 transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
              />
            </svg>
          </button>
        )}
      </div>
    </>
  );
};

export default ChatAssistant;
