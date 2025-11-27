import React, { FormEventHandler, useState } from 'react';
import { useForm, Head, router } from '@inertiajs/react';
import { Package, ArrowLeft, Upload, X, Sparkles, Wand2, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        quantity: '',
        category: 'Other',
        image: null as File | null,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [showSmartPaste, setShowSmartPaste] = useState(false);
    const [pasteContent, setPasteContent] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analyzeError, setAnalyzeError] = useState<string | null>(null);

    // Multiple product support
    const [extractedProducts, setExtractedProducts] = useState<any[]>([]);
    const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());
    const [isCreating, setIsCreating] = useState(false);
    const [creationProgress, setCreationProgress] = useState('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData('image', null);
        setImagePreview(null);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/products');
    };

    const fillFormWithProduct = (product: any) => {
        setData(prev => ({
            ...prev,
            name: product.name || prev.name,
            description: product.description || prev.description,
            price: product.price ? product.price.toString() : prev.price,
            category: product.category || prev.category,
        }));
    };

    const handleSmartPaste = async () => {
        if (!pasteContent.trim()) return;

        setIsAnalyzing(true);
        setAnalyzeError(null);
        setExtractedProducts([]);

        try {
            const response = await axios.post('/products/extract', {
                text: pasteContent
            });

            if (response.data.success && response.data.data && response.data.data.length > 0) {
                const products = response.data.data;

                if (products.length === 1) {
                    // Single product - auto fill immediately
                    const product = products[0];
                    fillFormWithProduct(product);
                    setShowSmartPaste(false);
                    setPasteContent('');
                } else {
                    // Multiple products - show selection
                    setExtractedProducts(products);
                    // Select all by default
                    setSelectedIndices(new Set(products.map((_: any, i: number) => i)));
                }
            } else {
                setAnalyzeError('Could not extract product details. Please try again with more details.');
            }
        } catch (error) {
            console.error('Smart paste error:', error);
            setAnalyzeError('Failed to analyze text. Please try again.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const toggleProductSelection = (index: number) => {
        const newIndices = new Set(selectedIndices);
        if (newIndices.has(index)) {
            newIndices.delete(index);
        } else {
            newIndices.add(index);
        }
        setSelectedIndices(newIndices);
    };

    const handleBulkCreate = async () => {
        if (selectedIndices.size === 0) return;

        setIsCreating(true);
        setCreationProgress('Creating products...');

        try {
            const indices = Array.from(selectedIndices);
            const productsToCreate = indices.map(index => extractedProducts[index]);

            // Ensure axios has the CSRF token
            // In a real app, this should be in a global config, but for now we fix it here
            // to ensure it works immediately.
            const csrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1];
            if (csrfToken) {
                axios.defaults.headers.common['X-XSRF-TOKEN'] = decodeURIComponent(csrfToken);
            }

            const response = await axios.post('/products/bulk', {
                products: productsToCreate.map(p => ({
                    name: p.name,
                    description: p.description,
                    price: p.price,
                    category: p.category,
                    quantity: 1
                }))
            });

            if (response.data.success) {
                // All done
                setShowSmartPaste(false);
                setPasteContent('');
                setExtractedProducts([]);

                // Redirect to index page to show new products
                router.visit('/products');
            } else {
                throw new Error(response.data.message || 'Failed to create products');
            }

        } catch (error) {
            console.error('Bulk create error:', error);
            setAnalyzeError('Failed to create products. Please try again.');
        } finally {
            setIsCreating(false);
            setCreationProgress('');
        }
    };

    const categories = [
        'Electronics',
        'Clothing',
        'Food',
        'Other',
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <Head title="Add Product" />

            <div className="max-w-3xl mx-auto px-3 sm:px-4 md:px-6 py-4 md:py-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => router.visit('/products')}
                            className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all"
                        >
                            <ArrowLeft size={20} className="text-slate-600" />
                        </button>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                Add New Product
                            </h1>
                            <p className="text-sm text-slate-500">Fill in the product details below</p>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            setShowSmartPaste(true);
                            setExtractedProducts([]);
                            setPasteContent('');
                            setAnalyzeError(null);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-100 transition-all border border-indigo-100"
                    >
                        <Sparkles size={18} />
                        <span className="hidden sm:inline">Smart Paste</span>
                    </button>
                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8">
                    <form onSubmit={submit} className="space-y-6">

                        {/* Product Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                                Product Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                                placeholder="e.g. Wireless Headphones"
                                required
                            />
                            {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none resize-none"
                                placeholder="Describe your product..."
                            />
                            {errors.description && <div className="text-red-600 text-sm mt-1">{errors.description}</div>}
                        </div>

                        {/* Price and Quantity */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="price" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Price <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                                    placeholder="0.00"
                                    required
                                />
                                {errors.price && <div className="text-red-600 text-sm mt-1">{errors.price}</div>}
                            </div>

                            <div>
                                <label htmlFor="quantity" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Quantity
                                </label>
                                <input
                                    id="quantity"
                                    type="number"
                                    min="0"
                                    value={data.quantity}
                                    onChange={(e) => setData('quantity', e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                                    placeholder="0"
                                />
                                {errors.quantity && <div className="text-red-600 text-sm mt-1">{errors.quantity}</div>}
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-semibold text-slate-700 mb-2">
                                Category
                            </label>
                            <select
                                id="category"
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            {errors.category && <div className="text-red-600 text-sm mt-1">{errors.category}</div>}
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Product Image
                            </label>

                            {!imagePreview ? (
                                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="w-10 h-10 text-slate-400 mb-3" />
                                        <p className="mb-2 text-sm text-slate-500">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-slate-400">PNG, JPG, GIF up to 2MB</p>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            ) : (
                                <div className="relative">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-48 object-cover rounded-lg border border-slate-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all shadow-lg"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}
                            {errors.image && <div className="text-red-600 text-sm mt-1">{errors.image}</div>}
                            <p className="text-xs text-slate-500 mt-2">
                                If no image is uploaded, a default placeholder will be used
                            </p>
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => router.visit('/products')}
                                className="flex-1 px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:border-slate-300 hover:bg-slate-50 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-bold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all shadow-lg flex items-center justify-center gap-2"
                            >
                                <Package size={18} />
                                {processing ? 'Creating...' : 'Create Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Smart Paste Modal */}
            {showSmartPaste && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-indigo-50 to-purple-50 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-indigo-600">
                                    <Sparkles size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">Smart Paste</h3>
                                    <p className="text-xs text-slate-500">Paste text to auto-fill details</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowSmartPaste(false)}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto">
                            {extractedProducts.length > 0 ? (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-semibold text-slate-700">Found {extractedProducts.length} Products</h4>
                                        <button
                                            onClick={() => {
                                                if (selectedIndices.size === extractedProducts.length) {
                                                    setSelectedIndices(new Set());
                                                } else {
                                                    setSelectedIndices(new Set(extractedProducts.map((_, i) => i)));
                                                }
                                            }}
                                            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                                        >
                                            {selectedIndices.size === extractedProducts.length ? 'Deselect All' : 'Select All'}
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {extractedProducts.map((product, index) => (
                                            <div
                                                key={index}
                                                onClick={() => toggleProductSelection(index)}
                                                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedIndices.has(index)
                                                    ? 'border-indigo-500 bg-indigo-50/50'
                                                    : 'border-slate-100 hover:border-slate-200 bg-white'
                                                    }`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className={`w-5 h-5 rounded border flex items-center justify-center mt-0.5 ${selectedIndices.has(index)
                                                        ? 'bg-indigo-500 border-indigo-500 text-white'
                                                        : 'border-slate-300 bg-white'
                                                        }`}>
                                                        {selectedIndices.has(index) && <CheckCircle2 size={14} />}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-start">
                                                            <h5 className="font-semibold text-slate-800">{product.name}</h5>
                                                            <span className="font-bold text-slate-900">
                                                                {product.currency} {product.price}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-slate-500 mt-1 line-clamp-2">{product.description}</p>
                                                        <span className="inline-block mt-2 text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
                                                            {product.category}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Paste product details
                                    </label>
                                    <textarea
                                        value={pasteContent}
                                        onChange={(e) => setPasteContent(e.target.value)}
                                        className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none text-sm"
                                        placeholder="e.g. Selling a Brand New iPhone 15 Pro Max, 256GB storage, Natural Titanium color. Price is $1,199. Available for pickup."
                                        autoFocus
                                    />
                                    <p className="text-xs text-slate-500 mt-2">
                                        We'll extract the name, price, description, and category automatically.
                                        You can paste multiple products at once!
                                    </p>
                                </div>
                            )}

                            {analyzeError && (
                                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center gap-2">
                                    <AlertCircle size={14} />
                                    {analyzeError}
                                </div>
                            )}
                        </div>

                        <div className="p-6 border-t border-slate-100 bg-slate-50 shrink-0">
                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        if (extractedProducts.length > 0) {
                                            setExtractedProducts([]);
                                            setPasteContent('');
                                        } else {
                                            setShowSmartPaste(false);
                                        }
                                    }}
                                    className="flex-1 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all"
                                >
                                    {extractedProducts.length > 0 ? 'Back' : 'Cancel'}
                                </button>

                                {extractedProducts.length > 0 ? (
                                    <button
                                        onClick={handleBulkCreate}
                                        disabled={selectedIndices.size === 0 || isCreating}
                                        className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all shadow-md flex items-center justify-center gap-2"
                                    >
                                        {isCreating ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                {creationProgress || 'Creating...'}
                                            </>
                                        ) : (
                                            <>
                                                <Package size={16} />
                                                Create {selectedIndices.size} Products
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSmartPaste}
                                        disabled={!pasteContent.trim() || isAnalyzing}
                                        className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all shadow-md flex items-center justify-center gap-2"
                                    >
                                        {isAnalyzing ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                Analyzing...
                                            </>
                                        ) : (
                                            <>
                                                <Wand2 size={16} />
                                                Process Text
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
