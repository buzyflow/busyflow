import React, { FormEventHandler } from 'react';
import { useForm, Head } from '@inertiajs/react';
import { Store, ArrowRight, Building2 } from 'lucide-react';

type Props = {
    industries: string[];
}
export default function Setup({ industries }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        phone: '',
        industry: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/setup-business');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <Head title="Setup Your Business" />

            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

                {/* Left Side: Brand */}
                <div className="bg-indigo-600 text-white p-12 flex flex-col justify-between md:w-1/2">
                    <div>
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                            <Building2 size={24} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-bold mb-4">Create Your First Business</h1>
                        <p className="text-indigo-100 text-lg leading-relaxed">
                            Set up your business profile to start using your AI assistant. You can manage multiple businesses from one account.
                        </p>
                    </div>
                    <div className="mt-12 space-y-3 text-indigo-100 text-sm">
                        <p>✓ Manage multiple businesses</p>
                        <p>✓ Dedicated AI assistant per business</p>
                        <p>✓ Customizable for each brand</p>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="p-12 md:w-1/2 flex flex-col justify-center">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">
                            Business Details
                        </h2>
                        <p className="text-slate-500">
                            Tell us about your business to get started.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                                Business Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                value={data.name}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                                autoFocus
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                placeholder="e.g. Urban Bites"
                            />
                            {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                                WhatsApp Number
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                name="phone"
                                value={data.phone}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                                onChange={(e) => setData('phone', e.target.value)}
                                required
                                placeholder="+234 800 000 0000"
                            />
                            {errors.phone && <div className="text-red-600 text-sm mt-1">{errors.phone}</div>}
                        </div>

                        <div>
                            <label htmlFor="industry" className="block text-sm font-medium text-slate-700 mb-1">
                                Industry
                            </label>
                            <select
                                id="industry"
                                name="industry"
                                value={data.industry}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                                onChange={(e) => setData('industry', e.target.value)}
                                required
                            >
                                <option value="">Select an industry</option>
                                {industries.map((industry) => (
                                    <option key={industry} value={industry}>
                                        {industry}
                                    </option>
                                ))}
                            </select>
                            {errors.industry && <div className="text-red-600 text-sm mt-1">{errors.industry}</div>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 group"
                        >
                            {processing ? 'Creating...' : 'Create Business'}
                            {!processing && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
