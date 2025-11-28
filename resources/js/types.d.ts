type Business = {
    id: number;
    user_id: number;
    name: string;
    slug: string;
    phone: string;
    industry: string;
    currency: string;
    created_at: string;
    updated_at: string;
};

type Customer = {
    id: number;
    name: string;
    phone: string;
    last_active: string;
}

type Bot = {
    id: number;
    name: string;
    description: string;
    avatar: string;
    persona: string;
    tone: string;
    active: boolean;
    created_at: string;
    updated_at: string;
};

type Product = {
    id: number;
    name: string;
    description: string;
    price: string;
    currency: string;
    category: string;
    stock: number;
    image: string | null;
}

type CartItem = {
    id: number;
    product_id: number;
    product_name: string;
    product_image: string;
    quantity: number;
    price: number;
    currency: string;
    subtotal: number;
}