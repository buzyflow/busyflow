import React, { FormEventHandler } from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import { Store, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Props {
    appName: string;
}

export default function Register({ appName }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <Head title="Register" />

            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

                {/* Left Side: Brand */}
                <div className="bg-indigo-600 text-white p-12 flex flex-col justify-between md:w-1/2">
                    <div>
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                            <Store size={24} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-bold mb-4">{appName}</h1>
                        <p className="text-indigo-100 text-lg leading-relaxed">
                            Empower your WhatsApp business with an intelligent AI assistant that handles customer inquiries and orders 24/7.
                        </p>
                    </div>
                    <div className="mt-12 space-y-4">
                        <div className="flex items-center gap-3 text-indigo-100">
                            <CheckCircle2 size={20} />
                            <span>24/7 Automated Customer Service</span>
                        </div>
                        <div className="flex items-center gap-3 text-indigo-100">
                            <CheckCircle2 size={20} />
                            <span>Customizable AI Personality</span>
                        </div>
                        <div className="flex items-center gap-3 text-indigo-100">
                            <CheckCircle2 size={20} />
                            <span>Real-time Product Management</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="p-12 md:w-1/2 flex flex-col justify-center">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">
                            Create your account
                        </h2>
                        <p className="text-slate-500">
                            Get started with your AI assistant today.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                value={data.name}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                                autoComplete="name"
                                autoFocus
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                placeholder="John Doe"
                            />
                            {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                placeholder="name@company.com"
                            />
                            {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                placeholder="••••••••"
                                minLength={6}
                            />
                            {errors.password && <div className="text-red-600 text-sm mt-1">{errors.password}</div>}
                        </div>

                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-slate-700 mb-1">
                                Confirm Password
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                            {errors.password_confirmation && <div className="text-red-600 text-sm mt-1">{errors.password_confirmation}</div>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 group"
                        >
                            {processing ? 'Processing...' : 'Create Account'}
                            {!processing && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-500">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="text-indigo-600 font-bold hover:underline"
                        >
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
