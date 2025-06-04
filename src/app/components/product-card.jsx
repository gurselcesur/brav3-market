"use client";

import React, { useState } from 'react';
import Link from "next/link";
import {useCart} from '../hooks/useCart';
import {useAddCampaign} from '../hooks/useAddCampaign';
import { useProducts } from '../hooks/useProducts';
import { MdOutlineAddShoppingCart } from "react-icons/md";

export default function ProductCard({ product }) {
    const { products } = useProducts();
    const { addItem } = useCart(products);
    const [isAdding, setIsAdding] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const handleAddToCart = async () => {
        if (isAdding) return;
        
        setIsAdding(true);
        await addItem({
            productId: product.id,
            amount: 1
        });
        
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
            setIsAdding(false);
        }, 2000);
    };

    return (
        <div className="relative flex flex-col justify-between h-110 border border-green-500 p-4 rounded shadow-md hover:shadow-green-500/30 transition">
            {showNotification && (
                <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center py-2 animate-fade-in-out">
                    Product added to cart!
                </div>
            )}
            <Link href={`/product/${product.id}`}>
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-55 object-contain mb-2 cursor-pointer"
                />
            </Link>
            <h2 className="text-lg font-pixel">{product.title}</h2>
            <p className="text-sm mb-1 text-gray-400">{product.description}</p>
            <div className="absolute bottom-4 left-4">
              {product.amount > 0 ? (
                product.discountedPrice ? (
                  <p className="text-2xl font-bold text-yellow-300">
                    <span className="line-through mr-2 text-red-500">${product.price}</span>
                    ${product.discountedPrice}
                  </p>
                ) : (
                  <p className="text-2xl font-bold text-white">${product.price}</p>
                )
              ) : (
                <p className="text-2xl font-bold text-red-600">Out of Stock</p>
              )}
            </div>
            <div className="flex justify-end mt-auto">
                <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className={`hover:border hover:border-green-400 px-3 py-1 rounded transition duration-300 ease-in-out ${isAdding ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <MdOutlineAddShoppingCart size={20} />
                </button>
            </div>
        </div>
    );
}