'use client';

import React, { useEffect, useRef } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";
import Link from "next/link";

const Page = () => {
  const { products } = useProducts();
  const { cart: cartItems, loading, refreshCart, removeItem, updateItem, addItem } = useCart(products);
  const [showSummary, setShowSummary] = React.useState(false);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const checkoutRef = useRef(null);

  useEffect(() => {
    if (showSummary && checkoutRef.current) {
      checkoutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showSummary]);

  const handleAddToCart = async (item) => {
    await addItem({
      productId: item.productId,
      amount: 1
    });
  };

  if (loading) return <p className="text-center mt-10">Loading cart...</p>;

  const total = cartItems.reduce((acc, item) => acc + (item.discountedPrice ? item.discountedPrice * item.amount : item.price * item.amount), 0);
  const delivery = total < 250 ? 20 : 0;
  const totalToPay = total + delivery;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FiShoppingCart size={30} />
          <h1 className="text-2xl">Your Shopping Cart</h1>
        </div>
        <div className="flex gap-2">
          {cartItems.length > 0 && (
            <button 
              onClick={() => {
                if (window.confirm('Are you sure you want to empty the cart?')) {
                  cartItems.forEach(item => removeItem(item.id));
                }
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
            >
              Empty Cart
            </button>
          )}
          <button 
            onClick={() => setShowSummary(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
      
      {cartItems.length === 0 ? (
        <h1 className="text-center ">Your cart is empty.</h1>
      ) : (
        <>
          <ul className="space-y-2">
            {cartItems.map(item => (
              <li key={item.id} className="relative flex items-center gap-4 border border-green-500 p-4 rounded">
                <Link href={`/product/${item.productId}`}>
                  <img
                      src={item.image}
                      alt={item.title}
                      className="w-32 h-32 object-contain cursor-pointer rounded"
                  />
                </Link>
                <div className="flex-1">
                  <h1 className="text-3xl ">{item.title}</h1>
                  <p className="text-sm text-gray-400 mb-2">{item.description}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <button
                      onClick={async () => {
                        if (item.amount > 1) {
                          await updateItem(item.id, { productId: item.productId, amount: item.amount - 1 });
                        }
                      }}
                      className="bg-green-500 text-white px-2 py-1 rounded text-sm hover:bg-green-400 cursor-pointer"
                    >
                      -
                    </button>
                      {item.amount}
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-green-500 text-white px-2 py-1 rounded text-sm hover:bg-green-400 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-2xl text-green-500 font-bold">{(item.discountedPrice ? item.discountedPrice * item.amount : item.price * item.amount)} $</p>
                </div>
                <button
                  onClick={async () => {
                    await removeItem(item.id);
                  }}
                  className="absolute top-2 right-2 text-xl px-2 py-1 rounded bg-red-500 text-white cursor-pointer hover:bg-red-400"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-green-600 pt-4">
            <h2 className="text-xl mb-2">Cart Summary</h2>
            <p>Total Price: {total.toFixed(2)} $</p>
            <p>
              Delivery: {delivery.toFixed(2)} $
              {delivery > 0 && (
                <span className="text-green-400 ml-2">
                  (Add ${(250 - total).toFixed(2)} more for free delivery!)
                </span>
              )}
            </p>
            <p className="font-bold text-lg mt-2">Total to Pay: {totalToPay.toFixed(2)} $</p>
            {showSummary && (
              <div ref={checkoutRef}>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">Order Note</label>
                  <textarea
                    className="w-full p-2 border border-green-500 rounded bg-black text-white"
                    rows="3"
                    placeholder="You can write your special notes about your order here..."
                  />
                </div>
                <button
                  onClick={() => {
                    cartItems.forEach(item => removeItem(item.id));
                    setShowSummary(false);
                    setShowConfirmation(true);
                  }}
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
                >
                  Pay Now
                </button>
              </div>
            )}
          </div>
        </>
      )}
      {showConfirmation && (
        <div className="mt-4 text-green-400 text-lg">
          Your payment was successful and your cart is now empty. Thank you!
        </div>
      )}
    </div>
  );
};

export default Page;