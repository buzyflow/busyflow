import React from 'react';
import { useForm } from '@inertiajs/react';
import { Bot, Save } from 'lucide-react';

interface Props {
    bot: {
        name: string;
        description: string;
        persona: string;
        tone: string;
    };
}

export default function BotSettingsForm({ bot }: Props) {
    const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
        name: bot.name || '',
        description: bot.description || '',
        persona: bot.persona || '',
        tone: bot.tone || 'professional',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // @ts-ignore
        put(route('business.settings.bot.update', route().params.business));
    };

    return (
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <header className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-50 rounded-lg">
                    <Bot className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                    <h2 className="text-lg font-medium text-slate-900">Bot Configuration</h2>
                    <p className="text-sm text-slate-500">
                        Customize how your AI bot interacts with customers.
                    </p>
                </div>
            </header>

            <form onSubmit={submit} className="space-y-6">
                {/* Bot Name */}
                <div>
                    <label htmlFor="bot_name" className="block text-sm font-medium text-slate-700 mb-1">
                        Bot Name
                    </label>
                    <input
                        id="bot_name"
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                        Description
                    </label>
                    <textarea
                        id="description"
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        placeholder="Briefly describe what your bot does..."
                    />
                    {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
                </div>

                {/* Persona */}
                <div>
                    <label htmlFor="persona" className="block text-sm font-medium text-slate-700 mb-1">
                        Persona / Instructions
                    </label>
                    <textarea
                        id="persona"
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                        value={data.persona}
                        onChange={(e) => setData('persona', e.target.value)}
                        placeholder="Give your bot a personality or specific instructions on how to behave..."
                    />
                    <p className="text-xs text-slate-500 mt-1">
                        These instructions will guide the AI's behavior and responses.
                    </p>
                    {errors.persona && <p className="text-sm text-red-600 mt-1">{errors.persona}</p>}
                </div>

                {/* Tone */}
                <div>
                    <label htmlFor="tone" className="block text-sm font-medium text-slate-700 mb-1">
                        Tone of Voice
                    </label>
                    <select
                        id="tone"
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none bg-white"
                        value={data.tone}
                        onChange={(e) => setData('tone', e.target.value)}
                    >
                        <option value="professional">Professional</option>
                        <option value="friendly">Friendly</option>
                        <option value="humorous">Humorous</option>
                        <option value="empathetic">Empathetic</option>
                    </select>
                    {errors.tone && <p className="text-sm text-red-600 mt-1">{errors.tone}</p>}
                </div>

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                        <Save size={18} />
                        Save Changes
                    </button>

                    {recentlySuccessful && (
                        <p className="text-sm text-green-600 font-medium animate-fade-in">
                            Saved successfully.
                        </p>
                    )}
                </div>
            </form>
        </section>
    );
}
