import React, { useState, useEffect, useRef } from 'react';
import { Head } from '@inertiajs/react';
import { Send, Bot as BotIcon, User, Loader2, ShoppingBag, X, Trash2 } from 'lucide-react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { messages as messagesRoute, send, cart as cartRoute } from "../../routes/business/chat";
import { Business, Bot, Customer, CartItem } from '@/types';

interface Message {
    id?: number;
    role: 'user' | 'assistant' | 'system';
    content: string;
    created_at?: string;
}

interface Props {
    business: Business;
    bot: Bot;
    customer?: Customer;
    conversation_id: number;
}

export default function Index({ business, bot, customer, conversation_id }: Props) {
    const conversationId = conversation_id;
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isSending, setIsSending] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [cartCurrency, setCartCurrency] = useState('USD');
    const [isLoadingCart, setIsLoadingCart] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messageInputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    useEffect(() => {
        loadMessages(conversationId);
    }, [conversationId]);

    const loadMessages = async (convId: number) => {
        try {
            const response = await axios.post(messagesRoute.url(business), {
                name: customer?.name || '',
                phone: customer?.phone || '',
            });

            if (response.data.success && response.data.messages) {
                setMessages(response.data.messages);
            }
        } catch (error) {
            console.error('Failed to load messages:', error);
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

        const attemptSend = async (retryCount = 0): Promise<void> => {
            try {
                const response = await axios.post(send.url(business), {
                    conversation_id: conversationId,
                    message: userMessage.content,
                });

                if (response.data.success) {
                    setMessages(prev => [...prev, response.data.message]);
                }
            } catch (error) {
                console.error(`Failed to send message (attempt ${retryCount + 1}):`, error);

                if (retryCount < 1) {
                    // Retry once
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return attemptSend(retryCount + 1);
                }

                // Failed after retry
                const errorMessage: Message = {
                    role: 'assistant',
                    content: 'Failed to connect to service. Please try again later.',
                    created_at: new Date().toISOString(),
                };
                setMessages(prev => [...prev, errorMessage]);
            }
        };

        try {
            await attemptSend();
        } finally {
            setIsSending(false);
            // Refocus the input after sending
            setTimeout(() => {
                messageInputRef.current?.focus();
            }, 100);
        }
    };

    const fetchCart = async () => {
        setIsLoadingCart(true);
        try {
            const response = await axios.get(cartRoute.url(business));
            if (response.data.success) {
                setCartItems(response.data.items || []);
                setCartTotal(response.data.total || 0);
                setCartCurrency(response.data.currency || 'USD');
            }
        } catch (error) {
            console.error('Failed to fetch cart:', error);
        } finally {
            setIsLoadingCart(false);
        }
    };

    const handleCartOpen = () => {
        setIsCartOpen(true);
        fetchCart();
    };

    return (
        <div className="h-[100dvh] overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col">
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
                    <div className="flex-1">
                        <h1 className="font-bold text-slate-900">{bot.name}</h1>
                        <p className="text-sm text-slate-500">{business.name}</p>
                    </div>
                    <button
                        onClick={handleCartOpen}
                        className="relative p-3 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <ShoppingBag size={24} className="text-slate-700" />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {cartItems.length}
                            </span>
                        )}
                    </button>
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
                                    <img src={bot.avatar ?? ''} alt={bot.name} className="w-full h-full rounded-full object-cover size-16" />
                                )}
                            </div>
                            <div className={`max-w-[70%] px-4 py-3 rounded-2xl ${msg.role === 'user'
                                ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
                                : 'bg-white border border-slate-200 text-slate-900 shadow-sm'
                                }`}>
                                <div className="text-sm prose prose-sm max-w-none prose-p:my-1 prose-img:rounded-lg prose-img:shadow-sm prose-a:text-indigo-600 prose-a:underline">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            img: ({ node, ...props }) => (
                                                <img {...props} className="max-w-full rounded-lg my-2 shadow-sm" />
                                            ),
                                            p: ({ node, ...props }) => (
                                                <p {...props} className="whitespace-pre-wrap mb-1 last:mb-0" />
                                            ),
                                            strong: ({ node, ...props }) => (
                                                <strong {...props} className="font-bold underline" />
                                            ),
                                        }}
                                    >
                                        {msg.content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    ))}

                    {isSending && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0">
                                <img src={bot.avatar ?? ''} alt={bot.name} className="w-full h-full rounded-full object-cover size-16" />
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
                            ref={messageInputRef}
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

            {/* Cart Sidebar */}
            {isCartOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setIsCartOpen(false)}
                    />

                    {/* Sidebar */}
                    <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-slate-200">
                            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <ShoppingBag size={24} />
                                Shopping Cart
                            </h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {isLoadingCart ? (
                                <div className="flex items-center justify-center h-32">
                                    <Loader2 size={32} className="animate-spin text-indigo-600" />
                                </div>
                            ) : cartItems.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-32 text-slate-500">
                                    <ShoppingBag size={48} className="mb-2 opacity-50" />
                                    <p>Your cart is empty</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex gap-3 p-3 bg-slate-50 rounded-lg">
                                            <img
                                                src={item.product_image}
                                                alt={item.product_name}
                                                className="w-20 h-20 object-cover rounded-md"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-slate-900">{item.product_name}</h3>
                                                <p className="text-sm text-slate-600">
                                                    Qty: {item.quantity} × {item.currency}{item.price.toFixed(2)}
                                                </p>
                                                <p className="font-bold text-indigo-600 mt-1">
                                                    {item.currency}{item.subtotal.toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="border-t border-slate-200 p-4 space-y-4">
                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span>Total:</span>
                                    <span className="text-indigo-600">{cartCurrency}{cartTotal.toFixed(2)}</span>
                                </div>
                                <button
                                    className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
                                    onClick={() => {
                                        // TODO: Implement checkout
                                        alert('Checkout functionality coming soon!');
                                    }}
                                >
                                    Checkout
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
