'use client';

import React from 'react';
import Link from "next/link";
import { useProducts } from '../hooks/useProducts';
import { useCampaigns } from '../hooks/useCampaigns';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay'

const EmblaCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  
  React.useEffect(() => {
    if (emblaApi) {
      console.log("Embla slide nodes:", emblaApi.slideNodes());
    }
  }, [emblaApi]);

  const { products } = useProducts();
  const { campaigns } = useCampaigns();

  const discountedProducts = campaigns
    .map(camp => {
      const product = products.find(p => p.id === camp.productId);
      if (!product) return null;
      return {
        ...product,
        discountedPrice: (product.price * (1 - camp.discountRate / 100)).toFixed(2)
      };
    })
    .filter(Boolean);

  return (
    <div className="embla overflow-hidden m-6" ref={emblaRef}>
      <div className="embla__container flex gap-4 px-4">
        {discountedProducts.map(product => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="embla__slide min-w-[200px] relative rounded-lg overflow-hidden border-4 border-green-500 cursor-pointer block"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-100 object-cover"
            />
            <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-2 text-3xl rounded">
              SALE! {100 - (product.discountedPrice / product.price * 100).toFixed(0)}% OFF
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EmblaCarousel;