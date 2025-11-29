import React, { useEffect, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Bot, Sparkles, Zap, Shield, TrendingUp, MessageSquare, ShoppingCart, BarChart3 } from 'lucide-react';
import { login } from '@/routes';

interface Plan {
    id: number;
    name: string;
    description: string;
    price: number;
    currency: string;
    billing_period: string;
    features: string[];
    is_featured: boolean;
}

export default function Home() {
    const { appName, auth } = usePage<PageProps>().props;
    const [Plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch pricing plans from API
        fetch('/api/pricing-plans')
            .then(res => res.json())
            .then(data => {
                setPlans(data.data || []);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch pricing plans:', error);
                setLoading(false);
            });
    }, []);

    const formatPrice = (price: number, currency: string) => {
        if (price === 0) return 'Free';
        const symbol = currency === 'NGN' ? '₦' : currency === 'USD' ? '$' : currency;
        return `${symbol}${price.toLocaleString()}`;
    };

    const getBillingPeriod = (period: string) => {
        const periods: Record<string, string> = {
            'monthly': '/month',
            'quarterly': '/quarter',
            'annually': '/year',
            'yearly': '/year',
        };
        return periods[period] || `/${period}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <Head title={`${appName} - AI-Powered Order Management`} />

            {/* Navigation */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <Bot className="text-white" size={24} />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                {appName}
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href="/subscription/plans"
                                    className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/30"
                                >
                                    View Plans
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="text-slate-700 hover:text-indigo-600 font-medium transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/30"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 sm:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-8">
                            <Sparkles size={16} />
                            <span>AI-Powered Order Management</span>
                        </div>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                            Transform Your Business
                            <br />
                            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                With AI Conversations
                            </span>
                        </h1>
                        <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Let your customers place orders naturally through AI-powered chat.
                            No forms, no friction—just conversation.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/register"
                                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-2xl shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:scale-105"
                            >
                                Start Free Trial
                            </Link>
                            <a
                                href="#features"
                                className="px-8 py-4 bg-white text-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all shadow-lg border border-slate-200"
                            >
                                See How It Works
                            </a>
                        </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
                    <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
                    <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">
                            Everything You Need to Succeed
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Powerful features designed to streamline your order management
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="group p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl hover:shadow-2xl transition-all duration-300 border border-indigo-100 hover:border-indigo-300">
                            <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <MessageSquare className="text-white" size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">AI Chat Interface</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Natural conversations that understand context and intent. Your customers chat, AI handles the rest.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-300">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <ShoppingCart className="text-white" size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Smart Cart Management</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Intelligent cart that updates in real-time as customers chat. No manual entry required.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl hover:shadow-2xl transition-all duration-300 border border-emerald-100 hover:border-emerald-300">
                            <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Zap className="text-white" size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Instant Processing</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Orders processed in milliseconds. Real-time updates keep you and your customers in sync.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="group p-8 bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl hover:shadow-2xl transition-all duration-300 border border-violet-100 hover:border-violet-300">
                            <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <BarChart3 className="text-white" size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Analytics Dashboard</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Track orders, customers, and revenue with beautiful, actionable insights.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="group p-8 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl hover:shadow-2xl transition-all duration-300 border border-orange-100 hover:border-orange-300">
                            <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Shield className="text-white" size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Secure & Reliable</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Enterprise-grade security with 99.9% uptime. Your data is always safe and accessible.
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="group p-8 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl hover:shadow-2xl transition-all duration-300 border border-pink-100 hover:border-pink-300">
                            <div className="w-14 h-14 bg-gradient-to-br from-pink-600 to-rose-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <TrendingUp className="text-white" size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Scale Effortlessly</h3>
                            <p className="text-slate-600 leading-relaxed">
                                From 10 to 10,000 orders per day. Our infrastructure grows with your business.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-0 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
                    <div className="absolute top-1/2 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                            Simple, Transparent Pricing
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Choose the perfect plan for your business needs. No hidden fees.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : Plans.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-slate-500 text-lg">No pricing plans available at the moment.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {Plans.map((plan) => {
                                const isFeatured = plan.is_featured;
                                return (
                                    <div
                                        key={plan.id}
                                        className={`relative flex flex-col h-full bg-white rounded-2xl transition-all duration-300 ${isFeatured
                                            ? 'shadow-xl ring-2 ring-indigo-600 scale-105 z-10'
                                            : 'shadow-lg hover:shadow-xl border border-slate-200'
                                            }`}
                                    >
                                        {isFeatured && (
                                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md whitespace-nowrap">
                                                    MOST POPULAR
                                                </span>
                                            </div>
                                        )}

                                        <div className="p-8 flex-grow">
                                            <h3 className={`text-xl font-bold mb-2 ${isFeatured ? 'text-indigo-600' : 'text-slate-900'}`}>
                                                {plan.name}
                                            </h3>
                                            <p className="text-slate-500 text-sm mb-6 min-h-[40px]">
                                                {plan.description}
                                            </p>

                                            <div className="flex items-baseline mb-8">
                                                <span className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
                                                    {formatPrice(plan.price, plan.currency)}
                                                </span>
                                                {plan.price > 0 && (
                                                    <span className="text-slate-500 ml-2 font-medium">
                                                        {getBillingPeriod(plan.billing_period)}
                                                    </span>
                                                )}
                                            </div>

                                            <ul className="space-y-4 mb-8">
                                                {plan.features?.map((feature, idx) => (
                                                    <li key={idx} className="flex items-start">
                                                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${isFeatured ? 'bg-indigo-100 text-indigo-600' : 'bg-green-100 text-green-600'}`}>
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                        <span className="ml-3 text-slate-600 text-sm leading-relaxed">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="p-8 pt-0 mt-auto">
                                            <Link
                                                href={auth.user ? '/subscription/plans' : `/subscription/subscribe/${plan.id}`}
                                                className={`block w-full py-3.5 px-6 text-center rounded-xl font-bold transition-all duration-200 ${isFeatured
                                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:scale-[1.02]'
                                                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                                                    }`}
                                            >
                                                {auth.user
                                                    ? 'View All Plans'
                                                    : (plan.price === 0 ? 'Get Started Free' : 'Start 14-Day Trial')
                                                }
                                            </Link>
                                            <p className="text-center text-xs text-slate-400 mt-4">
                                                {plan.price === 0 ? 'No credit card required' : 'Cancel anytime'}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/10" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                        Ready to Transform Your Business?
                    </h2>
                    <p className="text-xl text-indigo-100 mb-10">
                        Join hundreds of businesses already using {appName}
                    </p>
                    <Link
                        href="/register"
                        className="inline-block px-10 py-5 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-2xl hover:scale-105"
                    >
                        Start Your Free Trial
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center gap-2 mb-4 md:mb-0">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <Bot className="text-white" size={20} />
                            </div>
                            <span className="text-xl font-bold text-white">{appName}</span>
                        </div>
                        <p className="text-sm">
                            © 2025 {appName}. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>

            <style>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -50px) scale(1.1); }
                    50% { transform: translate(-20px, 20px) scale(0.9); }
                    75% { transform: translate(50px, 50px) scale(1.05); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                .bg-grid-white\\/10 {
                    background-image: 
                        linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
                    background-size: 40px 40px;
                }
            `}</style>
        </div>
    );
}
