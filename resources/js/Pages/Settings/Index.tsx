import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import BotSettingsForm from './Partials/BotSettingsForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import DeleteUserForm from './Partials/DeleteUserForm';
import { Business } from '@/types';

interface Props {
    business: Business;
    bot: any;
    status?: string;
}

export default function Index({ business, bot, status }: Props) {
    return (
        <AppLayout
            title="Settings"
            header={
                <h2 className="font-semibold text-xl text-slate-800 leading-tight">
                    Settings
                </h2>
            }
        >
            <Head title="Settings" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Bot Settings */}
                    <BotSettingsForm bot={bot} />

                    {/* Profile Information */}
                    <UpdateProfileInformationForm />

                    {/* Update Password */}
                    <UpdatePasswordForm />

                    {/* Delete Account */}
                    <DeleteUserForm />
                </div>
            </div>
        </AppLayout>
    );
}
