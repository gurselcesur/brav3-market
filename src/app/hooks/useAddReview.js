import { useState } from 'react';
import { addReview } from '../api/productService';

export function useAddReview(productId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitReview = async ({ userName, text, rating }) => {
    setLoading(true);
    setError(null);

    try {
      if (!productId) throw new Error("Invalid product ID");
      await addReview(productId, { userName, text, rating });
    } catch (err) {
      setError(err.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return { submitReview, loading, error };
}