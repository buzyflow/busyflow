import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';
import subscription from '@/routes/subscription';
import AppLayout from '@/Layouts/AppLayout';

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

interface Props {
    plans: Plan[];
    currentSubscription: {
        plan_id: number;
        status: string;
    } | null;
}

export default function Plans({ plans, currentSubscription }: Props) {
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

    const isCurrentPlan = (planId: number) => {
        return currentSubscription?.plan_id === planId;
    };

    return (
        <AppLayout title="Pricing Plans">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">
                        <Sparkles size={16} />
                        <span>Choose Your Plan</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Select the perfect plan for your business needs. Upgrade or downgrade anytime.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan) => {
                        const isFeatured = plan.is_featured;
                        const isCurrent = isCurrentPlan(plan.id);

                        return (
                            <div
                                key={plan.id}
                                className={`relative flex flex-col h-full bg-white rounded-2xl transition-all duration-300 ${isFeatured
                                    ? 'shadow-2xl ring-2 ring-indigo-600 scale-105 z-10'
                                    : 'shadow-lg hover:shadow-xl border border-slate-200'
                                    }`}
                            >
                                {isFeatured && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md whitespace-nowrap flex items-center gap-1">
                                            <Crown size={14} />
                                            MOST POPULAR
                                        </span>
                                    </div>
                                )}

                                {isCurrent && (
                                    <div className="absolute -top-4 right-4">
                                        <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                                            <Zap size={12} />
                                            CURRENT
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
                                        <span className="text-5xl font-bold text-slate-900 tracking-tight">
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
                                                <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${isFeatured ? 'bg-indigo-100 text-indigo-600' : 'bg-green-100 text-green-600'
                                                    }`}>
                                                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                                                </div>
                                                <span className="ml-3 text-slate-600 text-sm leading-relaxed">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="p-8 pt-0 mt-auto">
                                    {isCurrent ? (
                                        <div className="block w-full py-3.5 px-6 text-center rounded-xl font-bold bg-slate-100 text-slate-500 cursor-not-allowed">
                                            Current Plan
                                        </div>
                                    ) : (
                                        <Link
                                            href={subscription.create.url(plan.id)}
                                            className={`block w-full py-3.5 px-6 text-center rounded-xl font-bold transition-all duration-200 ${isFeatured
                                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:scale-[1.02]'
                                                : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                                                }`}
                                        >
                                            {currentSubscription ? 'Switch to This Plan' : (plan.price === 0 ? 'Get Started Free' : 'Start 14-Day Trial')}
                                        </Link>
                                    )}
                                    <p className="text-center text-xs text-slate-400 mt-4">
                                        {plan.price === 0 ? 'No credit card required' : 'Cancel anytime'}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}
