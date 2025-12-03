import React from 'react';
import { useParams } from 'react-router-dom';

export const ProductDetailPage: React.FC = () => {
    const { id } = useParams();
    return (
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl font-serif font-bold text-stone-900 mb-4">Product Detail</h1>
            <p className="text-stone-500">Viewing Product ID: {id}</p>
        </div>
    );
};
