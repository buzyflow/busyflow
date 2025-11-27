import React, { FormEventHandler, useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import { Bot, LogOut, Users, ShoppingBag, Package, TrendingUp, DollarSign, Sparkles, Zap, Plus } from 'lucide-react';


interface DashboardProps {
    business: {
        id: number;
        name: string;
        phone: string;
        industry: string;
        currency: string;
    };
    bot: {
        name: string;
        description: string;
        avatar: string;
        persona: string;
        tone: string;
        active: boolean;
    } | null;
    analytics: {
        total_customers: number;
        total_orders: number;
        total_products: number;
        total_revenue: number;
        new_orders_today: number;
        new_customers_this_week: number;
    };
    user: {
        name: string;
        email: string;
    };
}

export default function Dashboard({ business, bot, analytics, user }: DashboardProps) {
    const handleLogout = () => {
        router.post('/logout');
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: business.currency,
        }).format(amount);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <Head title="Dashboard" />

            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 md:py-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-4 md:mb-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                            <Bot className="text-white" size={20} />
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                Dashboard
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-1.5">
                                <span className="font-semibold text-indigo-600 truncate max-w-[120px] sm:max-w-none">{business.name}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-sm text-slate-600 hover:text-red-600 rounded-lg sm:rounded-xl hover:bg-red-50 transition-all"
                    >
                        <LogOut size={16} />
                        <span className="hidden sm:inline font-medium">Logout</span>
                    </button>
                </div>

                {/* Analytics Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 md:mb-6">
                    {/* Total Customers */}
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                <Users size={20} className="text-white" />
                            </div>
                            {analytics.new_customers_this_week > 0 && (
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                    +{analytics.new_customers_this_week} this week
                                </span>
                            )}
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">{analytics.total_customers}</h3>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Total Customers</p>
                    </div>

                    {/* Total Orders */}
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                                <ShoppingBag size={20} className="text-white" />
                            </div>
                            {analytics.new_orders_today > 0 && (
                                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                                    +{analytics.new_orders_today} today
                                </span>
                            )}
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">{analytics.total_orders}</h3>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Total Orders</p>
                    </div>

                    {/* Total Products */}
                    <Link href="/products" className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 hover:shadow-xl transition-shadow cursor-pointer block">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                                <Package size={20} className="text-white" />
                            </div>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">{analytics.total_products}</h3>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Products</p>
                    </Link>

                    {/* Total Revenue */}
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                                <DollarSign size={20} className="text-white" />
                            </div>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">{formatCurrency(analytics.total_revenue)}</h3>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Total Revenue</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mb-4 md:mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link
                        href="/products/create"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
                    >
                        <Plus size={20} />
                        <span>Add New Product</span>
                    </Link>
                    <Link
                        href="/products"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm"
                    >
                        <Package size={20} />
                        <span>View Inventory</span>
                    </Link>
                    {bot && bot.active && (
                        <a
                            href={`/chat?business_id=${business.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
                        >
                            <Bot size={20} />
                            <span>Test Chat Bot</span>
                        </a>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">

                    {/* Bot Preview Card */}
                    <div className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                        <div className="p-4 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 flex items-center gap-2">
                                    <Bot className="text-indigo-600" size={18} />
                                    <span>Your AI Assistant</span>
                                </h2>
                                {bot?.active && (
                                    <span className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                                        <Zap size={10} className="sm:w-3 sm:h-3" />
                                        <span>LIVE</span>
                                    </span>
                                )}
                            </div>
                        </div>

                        {bot ? (
                            <div className="p-4 sm:p-6 md:p-8 flex flex-col items-center gap-4 sm:gap-6">
                                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                                    <img src={bot.avatar} alt={bot.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="w-full text-center space-y-3 sm:space-y-4">
                                    <div>
                                        <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                            {bot.name}
                                        </h3>
                                        <p className="text-slate-500 text-xs sm:text-sm mt-1 font-medium">{bot.description}</p>
                                    </div>

                                    <div className="bg-gradient-to-br from-slate-50 to-indigo-50 p-3 sm:p-4 rounded-xl border border-indigo-100">
                                        <p className="text-slate-700 text-xs sm:text-sm break-words">
                                            <span className="font-semibold">Persona:</span> {bot.persona}
                                        </p>
                                        <p className="text-slate-700 text-xs sm:text-sm mt-2">
                                            <span className="font-semibold">Tone:</span> {bot.tone}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="p-8 text-center text-slate-500">
                                <p>No bot configured for this business</p>
                            </div>
                        )}
                    </div>

                    {/* Quick Stats */}
                    <div className="space-y-4 md:space-y-6">
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6">
                            <h3 className="font-bold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                                <TrendingUp size={16} className="text-indigo-600" />
                                <span>Business Info</span>
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
                                    <span className="text-xs sm:text-sm text-slate-600 font-medium">Industry</span>
                                    <span className="text-xs sm:text-sm font-bold text-slate-900">{business.industry}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                                    <span className="text-xs sm:text-sm text-slate-600 font-medium">Phone</span>
                                    <span className="text-xs sm:text-sm font-bold text-slate-900">{business.phone}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-100">
                                    <span className="text-xs sm:text-sm text-slate-600 font-medium">Currency</span>
                                    <span className="text-xs sm:text-sm font-bold text-slate-900">{business.currency}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 text-white">
                            <div className="flex items-center gap-2 mb-3">
                                <Sparkles size={18} />
                                <h3 className="text-base sm:text-lg font-bold">Welcome, {user.name}!</h3>
                            </div>
                            <p className="text-indigo-100 text-xs sm:text-sm leading-relaxed">
                                Your AI assistant is ready to help customers 24/7. Monitor your analytics and manage your business from this dashboard.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
