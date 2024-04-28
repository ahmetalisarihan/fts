import { useProducts } from "@/utils/products";


export async function metadata({ params }: { params: { slug: string } }) {
    const products = useProducts();

    const product = products?.find(p => p.slug === params.slug);
  
    if (!product) {
      return {
        title: 'Ürün Bulunamadı',
        description: 'Aradığınız ürün şu anda mevcut değil.',
      };
    }
  
    // Open Graph metadata'sını oluşturun
    return {
      title: decodeURIComponent(product.name),
      description: product.description,
      openGraph: {
        title: decodeURIComponent(product.name),
        description: product.description,
        url: `${process.env.NEXTAUTH_URL}/products/${product.slug}`,
        images: [
          {
            url: product.imageUrl,
            width: 800,
            height: 600,
          },
        ],
        type: 'product',
      },
      twitter: {
        card: 'summary_large_image',
        title: decodeURIComponent(product.name),
        description: product.description,
        images: [product.imageUrl],
      },
    };
  }