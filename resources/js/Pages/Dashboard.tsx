import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Users, ShoppingBag, Package, DollarSign, Sparkles, Plus, Bot, Copy, ExternalLink, Clock, CheckCircle2, Zap, TrendingUp } from 'lucide-react';
import { create, index } from '../routes/business/products';
import { index as chat } from '../routes/business/chat';
import AppLayout from '@/Layouts/AppLayout';
import { Business, Bot as BotType } from '@/types';

interface DashboardProps {
    business: Business
    bot: BotType & { url?: string } | null;
    analytics: {
        total_customers: number;
        total_orders: number;
        total_products: number;
        total_revenue: number;
        new_orders_today: number;
        new_customers_this_week: number;
    };
    recentOrders: Array<{
        id: number;
        customer_name: string;
        total: number;
        status: string;
        created_at: string;
    }>;
    user: {
        name: string;
        email: string;
    };
}

export default function Dashboard({ business, bot, analytics, recentOrders, user }: DashboardProps) {
    const [copied, setCopied] = useState(false);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: business.currency,
        }).format(amount);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AppLayout
            title="Dashboard"
            header={
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                        Dashboard
                    </h1>
                    <span className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-semibold flex items-center gap-1.5">
                        <span className="font-semibold truncate max-w-[120px] sm:max-w-none">{business.name}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    </span>
                </div>
            }
        >
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Analytics Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {/* Total Customers */}
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                <Users size={20} className="text-white" />
                            </div>
                            {analytics.new_customers_this_week > 0 && (
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                    +{analytics.new_customers_this_week}
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
                                    +{analytics.new_orders_today}
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Bot Link Section */}
                        {bot && bot.active && bot.url && (
                            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                                <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Bot className="w-6 h-6" />
                                        <h3 className="text-lg font-bold">Share Your Bot</h3>
                                    </div>
                                    <p className="text-indigo-100 text-sm">Share this link with your customers to start chatting.</p>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200">
                                        <code className="flex-1 text-sm text-slate-600 truncate px-2 font-mono">
                                            {bot.url}
                                        </code>
                                        <button
                                            onClick={() => copyToClipboard(bot.url!)}
                                            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-white rounded-md transition-all relative"
                                            title="Copy link"
                                        >
                                            {copied ? <CheckCircle2 size={20} className="text-green-500" /> : <Copy size={20} />}
                                        </button>
                                        <a
                                            href={bot.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-white rounded-md transition-all"
                                            title="Open in new tab"
                                        >
                                            <ExternalLink size={20} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Recent Orders */}
                        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-indigo-600" />
                                    Recent Orders
                                </h3>
                                <Link href="#" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                                    View All
                                </Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Order ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Customer</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-slate-200">
                                        {recentOrders.length > 0 ? (
                                            recentOrders.map((order) => (
                                                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                                                        #{order.id}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                                        {order.customer_name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-medium">
                                                        {formatCurrency(order.total)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-slate-100 text-slate-800'
                                                            }`}>
                                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                                        {order.created_at}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                                    No orders found yet.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Quick Actions & Info */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-amber-500" />
                                Quick Actions
                            </h3>
                            <div className="space-y-3">
                                <Link
                                    href={create(business.slug)}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 transition-all group border border-slate-100 hover:border-indigo-100"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                        <Plus size={20} className="text-indigo-600" />
                                    </div>
                                    <span className="font-medium">Add New Product</span>
                                </Link>
                                <Link
                                    href={index(business)}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-700 transition-all group border border-slate-100 hover:border-purple-100"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                        <Package size={20} className="text-purple-600" />
                                    </div>
                                    <span className="font-medium">View Inventory</span>
                                </Link>
                                {bot && bot.active && (
                                    <a
                                        href={chat.url(business)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-pink-50 text-slate-700 hover:text-pink-700 transition-all group border border-slate-100 hover:border-pink-100"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                            <Bot size={20} className="text-pink-600" />
                                        </div>
                                        <span className="font-medium">Test Chat Bot</span>
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Business Info */}
                        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-blue-500" />
                                Business Info
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                                    <span className="text-sm text-slate-500">Industry</span>
                                    <span className="text-sm font-semibold text-slate-900">{business.industry}</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                                    <span className="text-sm text-slate-500">Phone</span>
                                    <span className="text-sm font-semibold text-slate-900">{business.phone}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500">Currency</span>
                                    <span className="text-sm font-semibold text-slate-900">{business.currency}</span>
                                </div>
                            </div>
                        </div>

                        {/* Welcome Card */}
                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl shadow-xl p-6 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12 blur-2xl"></div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <Sparkles size={20} className="text-yellow-300" />
                                    <h3 className="text-lg font-bold">Welcome, {user.name}!</h3>
                                </div>
                                <p className="text-indigo-100 text-sm leading-relaxed">
                                    Your AI assistant is ready to help customers 24/7. Monitor your analytics and manage your business from this dashboard.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
