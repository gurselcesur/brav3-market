"use client";

import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { MdOutlineShoppingCart } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { products } = useProducts();
    const { cart, refreshCart } = useCart(products);
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        const count = cart.reduce((total, item) => total + item.amount, 0);
        setCartItemCount(count);
    }, [cart]);

    useEffect(() => {
        const interval = setInterval(() => {
            refreshCart();
        }, 1000);

        return () => clearInterval(interval);
    }, [refreshCart]);

    const handleMenuClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 bg-black border-b-3 border-green-500 relative">
            <div className="flex items-center justify-between w-full md:w-auto">
                <Link href="/" className="flex items-center gap-2 cursor-pointer hover:text-green-400">
                    <img src="/chewed-heart.svg" alt="Logo" className="w-15 h-15 hover:opacity-75" />
                    <span className="font-pixelify text-5xl font-extrabold">brav3</span>
                </Link>
                <button className="md:hidden text-green-500 mr-4 ml-4" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <GiHamburgerMenu size={30} />
                </button>
            </div>

            <div className="hidden md:flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <Link href="/campaign/add" className="text-xl font-pixelify hover:text-green-400 border border-green-500 p-2 rounded-md">
                    Add Campaign
                </Link>
                <Link href="/cart" className="flex items-center text-xl font-pixelify gap-2 hover:text-green-400 border border-green-500 p-2 rounded-md relative">
                    Shopping Cart
                    <MdOutlineShoppingCart size={25} />
                    {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {cartItemCount}
                        </span>
                    )}
                </Link>
            </div>

            {isMenuOpen && (
                <div className="flex flex-col gap-2 mt-2 md:hidden">
                    <Link 
                        href="/campaign/add" 
                        className="text-xl font-pixelify hover:text-green-400 border border-green-500 p-2 rounded-md"
                        onClick={handleMenuClick}
                    >
                        Add Campaign
                    </Link>
                    <Link 
                        href="/cart" 
                        className="flex items-center text-xl font-pixelify gap-2 hover:text-green-400 border border-green-500 p-2 rounded-md relative"
                        onClick={handleMenuClick}
                    >
                        Shopping Cart
                        <MdOutlineShoppingCart size={25} />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Header