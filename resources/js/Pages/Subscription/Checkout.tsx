import React from 'react';
import { Shield, Check, ArrowRight } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';

interface Props {
    plan: {
        id: number;
        name: string;
        price: number;
        currency: string;
        billing_period: string;
    };
    authorization_url: string;
    access_code: string;
    reference: string;
    paystack_public_key: string;
}

export default function Checkout({ plan, authorization_url }: Props) {
    const formatPrice = (price: number, currency: string) => {
        const symbol = currency === 'NGN' ? '₦' : currency === 'USD' ? '$' : currency;
        return `${symbol}${price.toLocaleString()}`;
    };

    return (
        <AppLayout title={`Subscribe to ${plan.name}`}>
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mb-4">
                                <Shield className="w-10 h-10 text-indigo-600" />
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 mb-2">Confirm Your Subscription</h3>
                            <p className="text-slate-600 text-lg">You are about to subscribe to the {plan.name} plan.</p>
                        </div>

                        <div className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-xl p-6 mb-8 border border-indigo-100">
                            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
                                <span className="text-slate-600 font-medium">Plan</span>
                                <span className="text-slate-900 font-bold text-lg">{plan.name}</span>
                            </div>
                            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
                                <span className="text-slate-600 font-medium">Billing Period</span>
                                <span className="text-slate-900 capitalize">{plan.billing_period}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-600 font-medium">Total</span>
                                <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    {formatPrice(plan.price, plan.currency)}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start bg-green-50 p-4 rounded-xl border border-green-100">
                                <div className="flex-shrink-0">
                                    <Check className="h-5 w-5 text-green-600" />
                                </div>
                                <p className="ml-3 text-sm text-slate-600">
                                    By clicking "Proceed to Payment", you agree to our Terms of Service and Privacy Policy.
                                    Your subscription will renew automatically unless cancelled.
                                </p>
                            </div>

                            <a
                                href={authorization_url}
                                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
                            >
                                Proceed to Payment
                                <ArrowRight className="w-5 h-5" />
                            </a>

                            <div className="text-center">
                                <p className="text-xs text-slate-400 flex items-center justify-center gap-2">
                                    <Shield className="w-3 h-3" />
                                    Secured by Paystack
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
