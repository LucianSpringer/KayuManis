import React from 'react';
import { Calendar, User } from 'lucide-react';
import { BLOG_POSTS } from '../../constants';

export const BlogPage: React.FC = () => (
    <div className="max-w-7xl mx-auto px-4 py-16 animate-fade-in">
        <div className="text-center mb-16">
            <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">Journal</span>
            <h1 className="text-4xl font-serif font-bold text-stone-900 mt-2">Stories from the Oven</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.map(post => (
                <div key={post.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition border border-stone-100">
                    <div className="h-48 overflow-hidden">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-4 text-xs text-stone-400 mb-3">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                            <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                        </div>
                        <h3 className="text-xl font-bold text-stone-900 mb-3 font-serif group-hover:text-amber-700">{post.title}</h3>
                        <p className="text-stone-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                        <button className="text-amber-600 font-bold text-sm uppercase tracking-wide hover:underline">Read Article</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
