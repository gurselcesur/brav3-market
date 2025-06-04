import { useEffect, useState } from "react";
import { getCart, addToCart, removeFromCart, updateCartItem } from "../api/cartService";

export function useCart(products) {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        setLoading(true);
        try {
            const data = await getCart();
            const detailedCart = data.map(cartItem => {
                const product = products.find(p => p.id === cartItem.productId);
                return {
                    ...product,
                    amount: cartItem.amount,
                    id: cartItem.id,
                    productId: cartItem.productId
                };
            }).filter(Boolean);
            setCart(detailedCart);
        } catch (err) {
            console.error("Failed to fetch cart", err);
        } finally {
            setLoading(false);
        }
    };

    const refreshCart = fetchCart;

    useEffect(() => {
        fetchCart();
    }, [products]);

    const addItem = async ({ productId, amount }) => {
        const existingItem = cart.find(item => String(item.productId) === String(productId));
        const product = products.find(p => String(p.id) === String(productId));

        if (!product) {
            console.error("Product not found for ID:", productId);
            return;
        }

        const currentAmountInCart = existingItem ? existingItem.amount : 0;
        const newAmount = currentAmountInCart + amount;

        if (newAmount > product.amount) {
            alert(`You can't add more than ${product.amount} items of this product.`);
            return;
        }

        if (existingItem) {
            await updateCartItem(existingItem.id, {
                productId,
                amount: newAmount,
            });
        } else {
            await addToCart({ productId, amount });
        }

        await fetchCart();
    };

    const removeItem = async (id) => {
        await removeFromCart(id);
        await fetchCart();
    };

    const updateItem = async (id, updated) => {
        await updateCartItem(id, updated);
        await fetchCart();
    };

    return {
        cart,
        loading,
        addItem,
        removeItem,
        updateItem,
        refreshCart
    };
}