"use client";

import React, { useState, useEffect } from 'react';
import { getProducts } from '../../api/productService';
import { useAddCampaign } from '../../hooks/useAddCampaign';

export default function AddCampaignPage() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [discountRate, setDiscountRate] = useState('');

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const { submitCampaign, loading, error } = useAddCampaign();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProductId || !discountRate) return alert("Fill all fields");

    await submitCampaign({
      productId: selectedProductId,
      discountRate: Number(discountRate)
    });

    setSelectedProductId('');
    setDiscountRate('');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Add Campaign</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          className="p-2 border border-green-500 bg-black text-green-400 rounded"
        >
          <option value="">Select a product</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.title}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Discount Rate (%)"
          value={discountRate}
          onChange={(e) => setDiscountRate(e.target.value)}
          className="p-2 border border-green-500 bg-black text-green-400 rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded"
        >
          Add Campaign
        </button>
      </form>
    </div>
  );
}