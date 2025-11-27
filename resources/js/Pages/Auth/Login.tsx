import React, { FormEventHandler } from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import { Store, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <Head title="Login" />

            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

                {/* Left Side: Brand */}
                <div className="bg-indigo-600 text-white p-12 flex flex-col justify-between md:w-1/2">
                    <div>
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                            <Store size={24} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-bold mb-4">BizyFlow</h1>
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
                            Welcome back
                        </h2>
                        <p className="text-slate-500">
                            Enter your credentials to access your dashboard.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
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
                                autoFocus
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
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                            {errors.password && <div className="text-red-600 text-sm mt-1">{errors.password}</div>}
                        </div>

                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-slate-700">
                                Remember me
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 group"
                        >
                            {processing ? 'Signing in...' : 'Sign In'}
                            {!processing && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-500">
                        Don't have an account?{' '}
                        <Link
                            href="/register"
                            className="text-indigo-600 font-bold hover:underline"
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
