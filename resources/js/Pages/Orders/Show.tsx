import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, router } from '@inertiajs/react';
import { Business } from '@/types';
import { Package, User, Phone, Mail, Calendar, CreditCard, Truck, Tag, ChevronLeft } from 'lucide-react';

interface OrderItem {
    id: number;
    product_name: string;
    product: {
        id: number;
        name: string;
        image?: string;
    } | null;
    quantity: number;
    unit_price: number;
    total: number;
}

interface Delivery {
    address?: string;
    city?: string;
    state?: string;
    notes?: string;
}

interface Order {
    id: number;
    order_number: string;
    customer: {
        id?: number;
        name: string;
        email?: string;
        phone?: string;
    };
    items: OrderItem[];
    delivery: Delivery;
    subtotal: number;
    discount: number;
    tax: number;
    delivery_fee: number;
    total: number;
    currency: string;
    status: string;
    payment_status: string;
    created_at: string;
    created_at_human: string;
}

interface Props {
    business: Business;
    order: Order;
}

const STATUS_COLORS = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    processing: 'bg-blue-100 text-blue-800 border-blue-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
};

const PAYMENT_STATUS_COLORS = {
    pending: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
};

export default function Show({ business, order }: Props) {
    const [updating, setUpdating] = useState(false);

    const handleStatusChange = (newStatus: string) => {
        if (confirm(`Are you sure you want to change the order status to "${newStatus}"?`)) {
            setUpdating(true);
            router.put(`/${business.slug}/orders/${order.id}/status`, {
                status: newStatus,
            }, {
                preserveScroll: true,
                onFinish: () => setUpdating(false),
            });
        }
    };

    return (
        <AppLayout
            title={`Order #${order.order_number}`}
            header={
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.visit(`/${business.slug}/orders`)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h2 className="font-semibold text-xl text-slate-800">
                        Order #{order.order_number}
                    </h2>
                </div>
            }
        >
            <Head title={`Order #${order.order_number}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Order Items */}
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="p-6 border-b border-slate-200">
                                    <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                        <Package className="w-5 h-5 text-indigo-600" />
                                        Order Items
                                    </h3>
                                </div>
                                <div className="divide-y divide-slate-200">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="p-6 flex gap-4">
                                            {item.product?.image && (
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product_name}
                                                    className="w-16 h-16 rounded-lg object-cover bg-slate-100"
                                                />
                                            )}
                                            <div className="flex-1">
                                                <h4 className="font-medium text-slate-900">{item.product_name}</h4>
                                                <p className="text-sm text-slate-500 mt-1">
                                                    Quantity: {item.quantity} × {order.currency} {item.unit_price?.toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-slate-900">
                                                    {order.currency} {item.total?.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Summary */}
                                <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">Subtotal</span>
                                        <span className="text-slate-900">{order.currency} {order.subtotal?.toLocaleString()}</span>
                                    </div>
                                    {order.discount > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-600">Discount</span>
                                            <span className="text-green-600">-{order.currency} {order.discount?.toLocaleString()}</span>
                                        </div>
                                    )}
                                    {order.tax > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-600">Tax</span>
                                            <span className="text-slate-900">{order.currency} {order.tax?.toLocaleString()}</span>
                                        </div>
                                    )}
                                    {order.delivery_fee > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-600">Delivery Fee</span>
                                            <span className="text-slate-900">{order.currency} {order.delivery_fee?.toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between font-semibold text-lg pt-2 border-t border-slate-200">
                                        <span className="text-slate-900">Total</span>
                                        <span className="text-slate-900">{order.currency} {order.total?.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Status Management */}
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                                <h3 className="text-lg font-semibold text-slate-900 mb-4">Order Status</h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Current Status
                                        </label>
                                        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium border ${STATUS_COLORS[order.status as keyof typeof STATUS_COLORS]}`}>
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </span>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Update Status
                                        </label>
                                        <div className="space-y-2">
                                            {['pending', 'processing', 'completed', 'cancelled'].map((status) => (
                                                <button
                                                    key={status}
                                                    onClick={() => handleStatusChange(status)}
                                                    disabled={updating || order.status === status}
                                                    className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${order.status === status
                                                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Payment Status
                                        </label>
                                        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium ${PAYMENT_STATUS_COLORS[order.payment_status as keyof typeof PAYMENT_STATUS_COLORS]}`}>
                                            {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Info */}
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                    <User className="w-5 h-5 text-indigo-600" />
                                    Customer
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm font-medium text-slate-700">{order.customer.name}</p>
                                    </div>
                                    {order.customer.email && (
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Mail className="w-4 h-4" />
                                            {order.customer.email}
                                        </div>
                                    )}
                                    {order.customer.phone && (
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Phone className="w-4 h-4" />
                                            {order.customer.phone}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Delivery Information */}
                            {(order.delivery.address || order.delivery.city || order.delivery.state) && (
                                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                        <Truck className="w-5 h-5 text-indigo-600" />
                                        Delivery Information
                                    </h3>
                                    <div className="space-y-3">
                                        {order.delivery.address && (
                                            <div>
                                                <p className="text-sm font-medium text-slate-700">Address</p>
                                                <p className="text-sm text-slate-600 mt-1">{order.delivery.address}</p>
                                            </div>
                                        )}
                                        <div className="grid grid-cols-2 gap-4">
                                            {order.delivery.city && (
                                                <div>
                                                    <p className="text-sm font-medium text-slate-700">City</p>
                                                    <p className="text-sm text-slate-600 mt-1">{order.delivery.city}</p>
                                                </div>
                                            )}
                                            {order.delivery.state && (
                                                <div>
                                                    <p className="text-sm font-medium text-slate-700">State</p>
                                                    <p className="text-sm text-slate-600 mt-1">{order.delivery.state}</p>
                                                </div>
                                            )}
                                        </div>
                                        {order.delivery.notes && (
                                            <div>
                                                <p className="text-sm font-medium text-slate-700">Delivery Notes</p>
                                                <p className="text-sm text-slate-600 mt-1">{order.delivery.notes}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Order Info */}
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                                <h3 className="text-lg font-semibold text-slate-900 mb-4">Order Info</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="w-4 h-4 text-slate-400" />
                                        <div>
                                            <p className="text-slate-600">Created {order.created_at_human}</p>
                                            <p className="text-xs text-slate-500">{order.created_at}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Tag className="w-4 h-4 text-slate-400" />
                                        <span className="text-slate-600">Order #{order.order_number}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
