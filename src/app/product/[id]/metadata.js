export async function generateMetadata({ params }) {
  const { products } = useProducts();
  const product = products.find(p => String(p.id) === params.id);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.'
    };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: `${product.title} | Brav3 Market`,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.title
        }
      ]
    }
  };
} 