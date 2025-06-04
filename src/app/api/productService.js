const BASE_URL = 'http://localhost:8000';

export async function getProducts() {
    const res = await fetch(`${BASE_URL}/products`);
    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }
    return res.json();
}

export async function getProductById(id) {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch product');
    }
    return res.json();
}
export async function addReview(productId, review) {
    const product = await getProductById(productId);

    const newReview = {
        id: Date.now(),
        userName: review.userName,
        text: review.text,
        rating: review.rating
    };

    const updated = {
        ...product,
        reviews: [...(product.reviews || []), newReview]
    };

    const res = await fetch(`${BASE_URL}/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
    });

    if (!res.ok) throw new Error("Failed to update reviews");
    return res.json();
}