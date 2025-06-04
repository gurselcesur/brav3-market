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
      <div className="embla__container flex gap-2 px-2">
        {discountedProducts.map(product => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="embla__slide w-[85vw] sm:w-[60vw] md:w-[40vw] lg:w-[30vw] xl:w-[25vw] flex-shrink-0 relative rounded-xl overflow-hidden cursor-pointer block"
          >
            <div className="relative w-full aspect-[3/4]">
              <img
                src={product.image}
                alt={product.title}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
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