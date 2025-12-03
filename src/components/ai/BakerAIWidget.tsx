import React, { useState, useEffect, useRef } from 'react';
import { X, MessageCircle, Phone, Send } from 'lucide-react';
import { getBakerResponse } from '../../../services/geminiService';

export const BakerAIWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ sender: 'user' | 'bot', text: string }[]>([
        { sender: 'bot', text: "Hi! I'm your Baker Assistant. 🥯 Looking for something special today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMsg = input;
        setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
        setInput("");
        setIsLoading(true);

        const reply = await getBakerResponse(userMsg);

        setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
        setIsLoading(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 bg-amber-600 hover:bg-amber-700 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </button>

            {/* WhatsApp Float */}
            <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noreferrer"
                className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl transition-all transform hover:scale-110"
            >
                <Phone className="w-6 h-6" />
            </a>

            {isOpen && (
                <div className="fixed bottom-24 right-6 md:right-8 z-40 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-stone-100 flex flex-col overflow-hidden max-h-[500px] animate-fade-in-up">
                    <div className="bg-amber-600 p-4 text-white flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-full">
                            <span className="text-xl">👩‍🍳</span>
                        </div>
                        <div>
                            <h3 className="font-bold">Baker Assistant</h3>
                            <p className="text-xs text-amber-100">Ask me for recommendations!</p>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.sender === 'user'
                                    ? 'bg-amber-600 text-white rounded-br-none'
                                    : 'bg-white text-stone-700 shadow-sm border border-stone-100 rounded-bl-none'
                                    }`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-stone-100">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-200"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="p-3 bg-white border-t border-stone-100 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type a message..."
                            className="flex-1 bg-stone-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading}
                            className="bg-amber-600 text-white p-2 rounded-full hover:bg-amber-700 disabled:opacity-50"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
