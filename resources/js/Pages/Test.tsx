import React from 'react';

export default function Test({ message }: { message: string }) {
    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold">Inertia + React Setup</h1>
            <p className="mt-4 text-lg">{message}</p>
        </div>
    );
}
