"use client";

import React from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/product-card';
import SearchFilters from '../components/search-filters';
import Loading from '../loading';
import { useState } from 'react';

const CampaignPage = () => {
    const { products, loading } = useProducts();
    const [searchQuery, setSearchQuery] = useState('');
    const [categorySort, setCategorySort] = useState('');
    const [priceSort, setPriceSort] = useState('');

    const campaignProducts = products.filter(product => product.discountedPrice);

    const filteredProducts = campaignProducts
        .filter(product =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (priceSort === 'high') return b.discountedPrice - a.discountedPrice;
            if (priceSort === 'low') return a.discountedPrice - b.discountedPrice;
            return 0;
        });

    return (
        <div className="min-h-screen bg-black text-green-400">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-8">Campaign Products</h1>
                
                <div className="mb-12">
                    <SearchFilters
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        categorySort={categorySort}
                        setCategorySort={setCategorySort}
                        priceSort={priceSort}
                        setPriceSort={setPriceSort}
                        products={campaignProducts}
                    />
                </div>

                {loading ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                        <Loading />
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <p className="text-center text-green-500 m-4">No campaign products found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredProducts
                            .filter(p => categorySort ? p.category === categorySort : true)
                            .map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CampaignPage; 