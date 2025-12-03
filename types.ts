export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: 'Bread' | 'Cake' | 'Pastry' | 'Snack';
    image: string;
    rating: number;
    reviews: number;
    ingredients: string[];
    isBestSeller?: boolean;
    // stock: number; // REMOVED
    // Sales & Pre-order
    isFlashSale?: boolean;
    flashSalePrice?: number;
    flashSaleEndTime?: string; // ISO string
    isPreOrder?: boolean;
    preOrderDate?: string; // "Available on ..."
    variants?: ProductVariant[];
}

export interface ProductVariant {
    name: string; // e.g., "Size", "Flavor"
    options: {
        label: string; // e.g., "Large", "Chocolate"
        priceModifier: number; // e.g., +5000
    }[];
}

export interface CartItem extends Product {
    quantity: number;
    selectedVariants?: { [key: string]: string }; // e.g., { "Size": "Large" }
    finalPrice: number; // Base price + modifiers
}

export interface User {
    name: string;
    email: string;
    points: number;
    tier: 'Silver' | 'Gold' | 'Platinum';
}

export interface Order {
    id: string;
    date: string;
    total: number;
    status: 'Pending' | 'Baking' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
    items: CartItem[];
    deliveryMethod: string;
    trackingNumber?: string;
}

export interface Review {
    id: number;
    productId: number;
    user: string;
    comment: string;
    rating: number;
    date: string;
    image?: string;
}

export interface Staff {
    id: number;
    name: string;
    role: 'Admin' | 'Baker' | 'Delivery' | 'CS';
    status: 'Active' | 'On Leave' | 'Busy';
    currentTask?: string;
}

export interface KitchenTask {
    id: number;
    orderId: string;
    description: string; // e.g., "Bake 5 Roti Sobek"
    status: 'Pending' | 'In Progress' | 'Completed';
    assignedTo?: string; // Staff Name
    deadline: string;
}