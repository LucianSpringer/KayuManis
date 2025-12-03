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
}

export interface CartItem extends Product {
    quantity: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    points: number;
    history: Order[];
}

export interface Order {
    id: string;
    date: string;
    items?: CartItem[];
    total: number;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Ready for Pickup';
    trackingNumber?: string;
    estimatedDelivery?: string;
    deliveryMethod?: 'Pickup' | 'Delivery';
}

export interface Review {
    id: number;
    user: string;
    comment: string;
    rating: number;
    date: string;
    productId?: number;
}