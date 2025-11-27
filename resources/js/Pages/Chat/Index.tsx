import React, { useState, useEffect, useRef } from 'react';
import { Head } from '@inertiajs/react';
import { Send, Bot as BotIcon, User, Loader2 } from 'lucide-react';
import axios from 'axios';

interface Bot {
    id: number;
    name: string;
    description: string;
    avatar: string | null;
    persona: string;
    tone: string;
}

interface Business {
    id: number;
    name: string;
    bot: Bot;
}

interface Message {
    id?: number;
    role: 'user' | 'assistant' | 'system';
    content: string;
    created_at?: string;
}

interface Props {
    business: Business;
    bot: Bot;
}

export default function Index({ business, bot }: Props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [conversationId, setConversationId] = useState<number | null>(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('/chat/start', {
                business_id: business.id,
                name,
                phone,
            });

            if (response.data.success) {
                setConversationId(response.data.conversation_id);
                setMessages(response.data.messages || []);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Authentication failed:', error);
            alert('Failed to start chat. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || !conversationId || isSending) return;

        const userMessage: Message = {
            role: 'user',
            content: message.trim(),
        };

        setMessages(prev => [...prev, userMessage]);
        setMessage('');
        setIsSending(true);

        try {
            const response = await axios.post('/chat/send', {
                conversation_id: conversationId,
                message: userMessage.content,
            });

            if (response.data.success) {
                setMessages(prev => [...prev, response.data.message]);
            }
        } catch (error) {
            console.error('Failed to send message:', error);
            alert('Failed to send message. Please try again.');
        } finally {
            setIsSending(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
                <Head title={`Chat with ${bot.name}`} />

                <div className="w-full max-w-md">
                    <div className="bg-white rounded-3xl shadow-2xl p-8">
                        {/* Bot Avatar */}
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg">
                                {bot.avatar ? (
                                    <img src={bot.avatar} alt={bot.name} className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    <BotIcon size={40} className="text-white" />
                                )}
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900 mb-1">{bot.name}</h1>
                            <p className="text-slate-500 text-center">{bot.description}</p>
                        </div>

                        {/* Auth Form */}
                        <form onSubmit={handleAuth} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Your Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                                    WhatsApp Number
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                                    placeholder="+1234567890"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all shadow-lg flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        Starting Chat...
                                    </>
                                ) : (
                                    'Start Chat'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col">
            <Head title={`Chat with ${bot.name}`} />

            {/* Header */}
            <div className="bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
                        {bot.avatar ? (
                            <img src={bot.avatar} alt={bot.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                            <BotIcon size={24} className="text-white" />
                        )}
                    </div>
                    <div>
                        <h1 className="font-bold text-slate-900">{bot.name}</h1>
                        <p className="text-sm text-slate-500">{business.name}</p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
                    {messages.length === 0 && (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BotIcon size={32} className="text-slate-400" />
                            </div>
                            <p className="text-slate-500">Start a conversation with {bot.name}</p>
                        </div>
                    )}

                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user'
                                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
                                    : 'bg-gradient-to-br from-indigo-500 to-purple-600'
                                }`}>
                                {msg.role === 'user' ? (
                                    <User size={16} className="text-white" />
                                ) : (
                                    <BotIcon size={16} className="text-white" />
                                )}
                            </div>
                            <div className={`max-w-[70%] px-4 py-3 rounded-2xl ${msg.role === 'user'
                                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
                                    : 'bg-white border border-slate-200 text-slate-900 shadow-sm'
                                }`}>
                                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                            </div>
                        </div>
                    ))}

                    {isSending && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0">
                                <BotIcon size={16} className="text-white" />
                            </div>
                            <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl shadow-sm">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input */}
            <div className="bg-white border-t border-slate-200 shadow-lg">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <form onSubmit={handleSendMessage} className="flex gap-3">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                            disabled={isSending}
                        />
                        <button
                            type="submit"
                            disabled={!message.trim() || isSending}
                            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all shadow-md flex items-center gap-2"
                        >
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
