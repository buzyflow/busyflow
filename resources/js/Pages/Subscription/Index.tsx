import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { CreditCard, Calendar, AlertTriangle, CheckCircle, XCircle, Clock, Sparkles, Crown, Zap, Shield, ArrowRight } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';

interface Props {
    subscription: {
        id: number;
        plan: {
            name: string;
            price: number;
            currency: string;
            billing_period: string;
        };
        status: string;
        trial_ends_at: string | null;
        current_period_end: string | null;
        cancelled_at: string | null;
        on_trial: boolean;
        on_grace_period: boolean;
    } | null;
    flash: {
        success?: string;
        error?: string;
    };
}

export default function Index({ subscription: userSubscription, flash }: Props) {
    const { post, processing } = useForm();

    const formatPrice = (price: number, currency: string) => {
        const symbol = currency === 'NGN' ? '₦' : currency === 'USD' ? '$' : currency;
        return `${symbol}${price.toLocaleString()}`;
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleCancel = () => {
        if (confirm('Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your billing period.')) {
            post('/subscription/cancel');
        }
    };

    const handleResume = () => {
        post('/subscription/resume');
    };

    return (
        <AppLayout title="My Subscription">
            <div className="max-w-4xl mx-auto space-y-8 py-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Subscription & Billing</h1>
                    <p className="text-slate-500 mt-1">Manage your plan, billing details, and invoices.</p>
                </div>

                {/* Flash Messages */}
                {flash.success && (
                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-emerald-800">{flash.success}</p>
                    </div>
                )}

                {flash.error && (
                    <div className="bg-red-50 border border-red-200 p-4 rounded-lg flex items-start gap-3">
                        <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-red-800">{flash.error}</p>
                    </div>
                )}

                {!userSubscription ? (
                    /* No Subscription State */
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
                        <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Sparkles className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Upgrade to Pro</h3>
                        <p className="text-slate-500 max-w-md mx-auto mb-8">
                            Unlock advanced features, higher limits, and priority support by upgrading your plan today.
                        </p>
                        <Link
                            href="/subscription/plans"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                        >
                            View Plans
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                ) : (
                    /* Active Subscription State */
                    <div className="space-y-6">
                        {/* Current Plan Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                        Current Plan
                                        {userSubscription.status === 'active' && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                                Active
                                            </span>
                                        )}
                                        {userSubscription.status === 'cancelled' && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                Cancelled
                                            </span>
                                        )}
                                    </h2>
                                    <p className="text-slate-500 text-sm mt-1">
                                        You are currently on the <span className="font-medium text-slate-900">{userSubscription.plan.name}</span> plan.
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-slate-900">
                                        {formatPrice(userSubscription.plan.price, userSubscription.plan.currency)}
                                        <span className="text-sm font-normal text-slate-500">/{userSubscription.plan.billing_period}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-slate-50/50">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <div className="text-sm font-medium text-slate-500">Billing Cycle</div>
                                        <div className="text-slate-900 font-medium flex items-center gap-2">
                                            <Calendar size={16} className="text-slate-400" />
                                            {userSubscription.plan.billing_period === 'monthly' ? 'Monthly' : 'Yearly'}
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="text-sm font-medium text-slate-500">
                                            {userSubscription.cancelled_at ? 'Access Ends' : 'Next Payment'}
                                        </div>
                                        <div className="text-slate-900 font-medium flex items-center gap-2">
                                            <Clock size={16} className="text-slate-400" />
                                            {formatDate(userSubscription.current_period_end)}
                                        </div>
                                    </div>

                                    {userSubscription.on_trial && (
                                        <div className="space-y-1">
                                            <div className="text-sm font-medium text-slate-500">Trial Status</div>
                                            <div className="text-indigo-600 font-medium flex items-center gap-2">
                                                <Sparkles size={16} />
                                                Ends {formatDate(userSubscription.trial_ends_at)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Grace Period Alert */}
                        {userSubscription.on_grace_period && (
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-medium text-amber-800">Subscription Cancelled</h4>
                                    <p className="text-sm text-amber-700 mt-1">
                                        Your subscription has been cancelled but you will retain access to premium features until the end of your billing period on {formatDate(userSubscription.current_period_end)}.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h3 className="text-lg font-semibold text-slate-900 mb-4">Plan Management</h3>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/subscription/plans"
                                    className="inline-flex justify-center items-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                >
                                    Change Plan
                                </Link>

                                {userSubscription.on_grace_period ? (
                                    <button
                                        onClick={handleResume}
                                        disabled={processing}
                                        className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50"
                                    >
                                        Resume Subscription
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleCancel}
                                        disabled={processing}
                                        className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-50"
                                    >
                                        Cancel Subscription
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
