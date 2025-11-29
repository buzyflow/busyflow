import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { User, Save } from 'lucide-react';

export default function UpdateProfileInformationForm({ className = '' }: { className?: string }) {
    const user = usePage().props.auth.user;

    const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // @ts-ignore
        put(route('business.settings.profile.update', route().params.business));
    };

    return (
        <section className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 ${className}`}>
            <header className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg">
                    <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h2 className="text-lg font-medium text-slate-900">Profile Information</h2>
                    <p className="text-sm text-slate-500">
                        Update your account's profile information and email address.
                    </p>
                </div>
            </header>

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                    />
                    {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                </div>

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:opacity-50"
                    >
                        <Save size={18} />
                        Save
                    </button>

                    {recentlySuccessful && (
                        <p className="text-sm text-green-600 font-medium animate-fade-in">
                            Saved.
                        </p>
                    )}
                </div>
            </form>
        </section>
    );
}
