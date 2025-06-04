const BASE_URL = "http://localhost:8000";

export async function getCart() {
  const res = await fetch(`${BASE_URL}/shoppingcart`);
  if (!res.ok) throw new Error("Failed to fetch cart items");
  return res.json();
}

export async function addToCart({ productId, amount }) {
  const res = await fetch(`${BASE_URL}/shoppingcart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, amount })
  });
  if (!res.ok) throw new Error("Failed to add item to cart");
  return res.json();
}

export async function removeFromCart(id) {
  const res = await fetch(`${BASE_URL}/shoppingcart/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Failed to remove item from cart");
}

export async function updateCartItem(id, { productId, amount }) {
  const res = await fetch(`${BASE_URL}/shoppingcart/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, amount })
  });
  if (!res.ok) throw new Error("Failed to update cart item");
  return res.json();
}