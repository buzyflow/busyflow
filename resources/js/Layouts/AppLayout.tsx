import React, { PropsWithChildren, ReactNode, useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Bot, LogOut, LayoutDashboard, CreditCard, Package, Menu, X, ChevronRight, MessageSquare, ShoppingBag, Settings } from 'lucide-react';

interface Props {
    title?: string;
    header?: ReactNode;
}

export default function AppLayout({ title, header, children }: PropsWithChildren<Props>) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { appName, auth, business } = usePage<PageProps>().props;
    const currentPath = window.location.pathname;

    const handleLogout = () => {
        router.post('/logout');
    };

    const navigation = [
        {
            name: 'Dashboard',
            href: business?.slug ? `/${business.slug}/dashboard` : '#',
            icon: LayoutDashboard,
            active: currentPath.includes('/dashboard'),
            show: !!business,
        },
        {
            name: 'Bot',
            href: business?.slug ? `/${business.slug}/chat` : '#',
            icon: MessageSquare,
            active: currentPath.includes('/chat'),
            show: !!business,
        },
        {
            name: 'Orders',
            href: business?.slug ? `/${business.slug}/orders` : '#',
            icon: ShoppingBag,
            active: currentPath.includes('/orders'),
            show: !!business,
        },
        {
            name: 'Settings',
            href: business?.slug ? `/${business.slug}/settings` : '#',
            icon: Settings,
            active: currentPath.includes('/settings'),
            show: !!business,
        },
        {
            name: 'Products',
            href: business?.slug ? `/${business.slug}/products` : '#',
            icon: Package,
            active: currentPath.includes('/products'),
            show: !!business,
        },
        {
            name: 'Subscription',
            href: '/subscription',
            icon: CreditCard,
            active: currentPath === '/subscription' || currentPath === '/subscription/plans',
            show: true,
        },
    ].filter(item => item.show);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <Head title={title || 'Dashboard'} />

            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-full w-64 bg-white/80 backdrop-blur-md border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Logo */}
                <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                        <Bot className="text-white" size={24} />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        {appName}
                    </span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${item.active
                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                                    : 'text-slate-700 hover:bg-slate-100'
                                    }`}
                            >
                                <Icon size={20} />
                                <span>{item.name}</span>
                                {item.active && <ChevronRight size={16} className="ml-auto" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* User section */}
                <div className="border-t border-slate-200 p-4">
                    <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-br from-slate-50 to-indigo-50 rounded-xl border border-indigo-100">
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">
                                {auth.user?.name}
                            </p>
                            <p className="text-xs text-slate-500 truncate">{auth.user?.email}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Logout"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>

                {/* Close button for mobile */}
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="absolute top-4 right-4 p-2 text-slate-600 hover:bg-slate-100 rounded-lg lg:hidden"
                >
                    <X size={20} />
                </button>
            </aside>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top header */}
                <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
                    <div className="px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            {/* Mobile menu button */}
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg lg:hidden"
                            >
                                <Menu size={24} />
                            </button>

                            {/* Header content */}
                            <div className="flex-1 lg:flex-none">
                                {header || (
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                        {title || 'Dashboard'}
                                    </h1>
                                )}
                            </div>

                            {/* Desktop user info */}
                            <div className="hidden lg:flex items-center gap-4">
                                <span className="text-sm text-slate-600">{auth.user?.name}</span>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all"
                                >
                                    <LogOut size={16} />
                                    <span className="font-medium">Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-4 sm:p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}
