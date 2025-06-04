export async function getProducts() {
    const res = await fetch('/data.json');
    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }
    const data = await res.json();
    return data.products;
}

export async function getProductById(id) {
    const res = await fetch('/data.json');
    if (!res.ok) {
        throw new Error('Failed to fetch product');
    }
    const data = await res.json();
    return data.products.find(product => product.id === id);
}

export async function addReview(productId, review) {
    const res = await fetch('/data.json');
    if (!res.ok) {
        throw new Error('Failed to fetch product');
    }
    const data = await res.json();
    const product = data.products.find(p => p.id === productId);
    
    if (!product) {
        throw new Error('Product not found');
    }

    const newReview = {
        id: Date.now(),
        userName: review.userName,
        text: review.text,
        rating: review.rating
    };

    product.reviews = [...(product.reviews || []), newReview];
    return product;
}