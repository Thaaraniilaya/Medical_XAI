import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { chatWithAssistant } from '../api/api';

const Chat = ({ language = 'English', t }) => {
    // Fallback if 't' is not provided directly (though App.jsx should pass it)
    const text = t || {
        aiAssistant: "MedAssistant AI",
        alwaysHere: "Always here to help you",
        typeAsk: "Type in to ask...",
        send: "Send",
        thinking: "Thinking..."
    };

    const [messages, setMessages] = useState([
        { id: 1, text: `Hello! I'm your ${text.aiAssistant}. How can I help you today?`, sender: 'bot' }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            // Get last 4 messages for context (excluding current)
            const history = messages.slice(-4).map(m => `${m.sender.toUpperCase()}: ${m.text}`).join('\n');

            const response = await chatWithAssistant(input, language, history);
            const botMessage = { id: Date.now() + 1, text: response.reply || "I didn't understand that.", sender: 'bot' };

            // Check if response is a quota/fallback message
            if (response.reply && response.reply.includes("high traffic")) {
                botMessage.isFallback = true;
            }

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Chat Error:", error);
            const errorMessage = {
                id: Date.now() + 1,
                text: "Sorry, I'm having trouble connecting to the server. Please check your internet or try again later.",
                sender: 'bot',
                isError: true
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col glass-card overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl">
            {/* Chat Header */}
            <div className="p-4 border-b border-white/20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                    <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Bot size={20} className="text-white" />
                    </div>
                    {text.aiAssistant}
                </h2>
                <p className="text-xs text-indigo-100 ml-10 opacity-90">{text.alwaysHere} • {language}</p>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/50 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-indigo-500' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
                                }`}>
                                {msg.sender === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-indigo-500 dark:text-indigo-400" />}
                            </div>
                            <div className={`p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                ? 'bg-indigo-500 text-white rounded-tr-none shadow-md'
                                : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-sm rounded-tl-none'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    </motion.div>
                ))}
                {loading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="flex gap-3 max-w-[80%]">
                            <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                                <Bot size={16} className="text-indigo-500 dark:text-indigo-400" />
                            </div>
                            <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                                <Loader2 size={16} className="animate-spin text-indigo-500" />
                                <span className="text-slate-400 text-xs">{text.thinking}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                <form onSubmit={handleSend} className="flex gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={text.typeAsk}
                        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 focus:border-indigo-400 transition-all bg-slate-50 dark:bg-slate-800 dark:text-white placeholder:text-slate-400"
                    />
                    <button
                        type="submit"
                        disabled={loading || !input.trim()}
                        className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 rounded-xl flex items-center gap-2 transition-all font-medium shadow-lg shadow-indigo-200 dark:shadow-none"
                    >
                        <Send size={18} />
                        <span className="hidden sm:inline">{text.send}</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
