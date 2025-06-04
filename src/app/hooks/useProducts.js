import { useEffect, useState } from "react";
import { getProducts } from "../api/productService";
import { getCampaigns } from "../api/campaignService";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const [productData, campaignData] = await Promise.all([
        getProducts(),
        getCampaigns()
      ]);

      const enriched = productData.map(product => {
        const campaign = campaignData.find(c => String(c.productId) === String(product.id));
        return campaign
          ? {
              ...product,
              discountedPrice: (product.price * (1 - campaign.discountRate / 100)).toFixed(2),
              discountRate: campaign.discountRate
            }
          : product;
      });

      setProducts(enriched);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const refreshProducts = async () => {
    setLoading(true);
    await fetchProducts();
  };

  return { products, loading, error, refreshProducts };
}