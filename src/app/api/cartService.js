const CART_KEY = 'brav3-cart';

function getCartFromStorage() {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

function saveCartToStorage(cart) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export async function getCart() {
  return getCartFromStorage();
}

export async function addToCart({ productId, amount }) {
  const cart = getCartFromStorage();
  const existingItem = cart.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.amount += amount;
  } else {
    cart.push({
      id: Date.now(),
      productId,
      amount
    });
  }

  saveCartToStorage(cart);
  return cart;
}

export async function removeFromCart(id) {
  const cart = getCartFromStorage();
  const newCart = cart.filter(item => item.id !== id);
  saveCartToStorage(newCart);
  return { id };
}

export async function updateCartItem(id, { productId, amount }) {
  const cart = getCartFromStorage();
  const item = cart.find(item => item.id === id);
  
  if (!item) throw new Error("Cart item not found");
  
  item.productId = productId;
  item.amount = amount;
  
  saveCartToStorage(cart);
  return item;
}