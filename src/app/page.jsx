"use client";

import React, { useState } from 'react';
import ProductCard from './components/product-card';
import EmblaCarousel from './components/embla-carousel';
import SearchFilters from './components/search-filters';
import SaleBanner from './components/sale-banner';
import { useProducts } from './hooks/useProducts';

const Page = () => {
  const { products, loading } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [categorySort, setCategorySort] = useState('');
  const [priceSort, setPriceSort] = useState('');

  const filteredProducts = products
    .filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (priceSort === 'high') return (b.discountedPrice || b.price) - (a.discountedPrice || a.price);
      if (priceSort === 'low') return (a.discountedPrice || a.price) - (b.discountedPrice || b.price);
      return 0;
    });

  return (
    <div>
      <EmblaCarousel />
      <SaleBanner />
      <SearchFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categorySort={categorySort}
        setCategorySort={setCategorySort}
        priceSort={priceSort}
        setPriceSort={setPriceSort}
        products={products}
      />
      {loading ? (
        <p className="text-center text-green-500 m-4">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 m-4 gap-4">
          {filteredProducts
            .filter(p => categorySort ? p.category === categorySort : true)
            .map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Page;