import { useProducts } from "@/utils/products";


export async function metadata({ params }: { params: { id: string } }) {
    const products = useProducts();

    const product = products?.find(p => p.id === params.id);
  
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
        url: `${process.env.NEXTAUTH_URL}/products/${product.id}`,
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