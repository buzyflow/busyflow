import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Bot as BotIcon, Loader2, } from 'lucide-react';
import { start, index } from "../../routes/business/chat";
import { router } from '@inertiajs/core';

interface Props {
    business: Business;
    bot: Bot;
}

export default function Form({ business, bot }: Props) {
    const form = useForm({
        name: '',
        phone: '',
    })

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        form.post(start.url(business))
    };

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
                                value={form.data.name}
                                onChange={(e) => form.setData('name', e.target.value)}
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
                                value={form.data.phone}
                                onChange={(e) => form.setData('phone', e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                                placeholder="+1234567890"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={form.processing}
                            className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                            {form.processing ? (
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
