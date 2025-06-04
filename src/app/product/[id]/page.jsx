'use client';

import { useParams } from 'next/navigation';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../hooks/useCart';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useAddReview } from '../../hooks/useAddReview';
import { MdOutlineAddShoppingCart } from "react-icons/md";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { products, refreshProducts } = useProducts();

  const product = products.find(p => String(p.id) === id);

  const { addItem, updateItem, cart } = useCart(products);
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const existingCartItem = cart.find(item => item.productId === product?.id);
  const totalPrice = (product?.discountedPrice || product?.price) * quantity;

  const [hoveredStar, setHoveredStar] = useState(null);
  const [selectedStar, setSelectedStar] = useState(null);

  // Review form state and hook
  const { submitReview, loading: reviewLoading, error: reviewError } = useAddReview(product?.id);
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');

  const handleAddToCart = async () => {
    if (!quantity || quantity < 1) return alert("Please select a quantity.");

    if (existingCartItem) {
      await updateItem(existingCartItem.id, { productId: product.id, amount: quantity });
    } else {
      await addItem({ productId: product.id, amount: quantity });
    }
  };

  if (!product) return <p className="p-4">Product not found.</p>;

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row gap-8 mb-6">
        <div className="flex-shrink-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-80 h-80 object-cover rounded"
          />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-4xl font-bold">{product.title}</h1>
            <div className="text-2xl font-bold text-green-400">Total: ${totalPrice.toFixed(2)}</div>
          </div>
          <p className="mb-2 text-lg text-gray-400">{product.description}</p>
          <p className="text-sm text-yellow-300 mb-1">In Stock: {product.amount}</p>
          {product.discountedPrice ? (
            <p className="text-2xl text-green-600 font-bold">
              <span className="line-through mr-2 text-red-500">${product.price}</span>
              ${product.discountedPrice}
            </p>
          ) : (
            <p className="text-2xl text-green-600 font-bold">${product.price}</p>
          )}
          <div className="flex items-center gap-4 mt-4">
            <input
              type="number"
              min="1"
              max={product.amount}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-16 px-2 py-1 border rounded bg-black text-green-500 border-green-700"
            />
            <button
              onClick={handleAddToCart}
              className="px-5 py-2 bg-green-500 hover:bg-green-400 text-white rounded"
            >
              Add to Cart
            </button>
            <button
              onClick={() => router.push('/cart')}
              className="text center px-5 py-2 bg-green-500 hover:bg-green-400 text-white rounded flex justify-end mt-auto"
            >
              <span className="mr-1">Go to Cart</span>
              <MdOutlineAddShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl mb-2 font-semibold">Reviews</h2>
        <ul className="mb-6 text-base text-gray-200 space-y-3">
          {(product.reviews || []).map(review => (
            <li key={review.id} className="border-b border-green-700 pb-2">
              <p className="font-semibold text-green-400">{review.userName}</p>
              <div className="flex items-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((i) =>
                  i <= review.rating ? (
                    <FaStar key={i} className="text-yellow-400" />
                  ) : (
                    <FaRegStar key={i} className="text-yellow-400" />
                  )
                )}
              </div>
              <p>{review.text}</p>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => {
            const isHovered = hoveredStar !== null;
            const filled = isHovered ? star <= hoveredStar : star <= selectedStar;

            const Icon = filled ? FaStar : FaRegStar;

            return (
              <button
                type="button"
                key={star}
                onClick={() => setSelectedStar(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(null)}
                className="text-yellow-400 text-xl"
              >
                <Icon />
              </button>
            );
          })}
        </div>
        <form
          className="flex flex-col gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!selectedStar || !reviewName.trim() || !reviewText.trim()) {
              alert("Please fill in all fields and select a star rating.");
              return;
            }
            await submitReview({
              userName: reviewName,
              text: reviewText,
              rating: selectedStar
            });
            await refreshProducts();
            setReviewName('');
            setReviewText('');
            setSelectedStar(null);
          }}
        >
          <input
            type="text"
            placeholder="Your name"
            value={reviewName}
            onChange={(e) => setReviewName(e.target.value)}
            className="bg-black border border-green-700 p-2 rounded text-green-500"
          />
          <textarea
            placeholder="Write a review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="bg-black border border-green-700 p-2 rounded text-green-500"
          />
          <button
            type="submit"
            className="self-start px-4 py-1 bg-green-700 hover:bg-green-600 text-white rounded"
            disabled={reviewLoading}
          >
            {reviewLoading ? "Submitting..." : "Submit Review"}
          </button>
          {reviewError && <p className="text-red-500">{reviewError}</p>}
        </form>
      </div>
    </div>
  );
}