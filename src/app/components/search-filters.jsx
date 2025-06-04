import React from 'react';

const SearchFilters = ({ 
  searchQuery, 
  setSearchQuery, 
  categorySort, 
  setCategorySort, 
  priceSort, 
  setPriceSort, 
  products 
}) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4 px-4 mt-6 text-center">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border border-green-500 rounded bg-black text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
      />
      <select
        value={categorySort}
        onChange={(e) => setCategorySort(e.target.value)}
        className="p-2 border border-green-500 rounded bg-black text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
      >
        <option value="">All Categories</option>
        {[...new Set(products.map(p => p.category))].map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <select
        value={priceSort}
        onChange={(e) => setPriceSort(e.target.value)}
        className="p-2 border border-green-500 rounded bg-black text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
      >
        <option value="">Sort by Price</option>
        <option value="high">Price: High to Low</option>
        <option value="low">Price: Low to High</option>
      </select>
    </div>
  );
};

export default SearchFilters; 