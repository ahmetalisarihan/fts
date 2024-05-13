import { Metadata, ResolvingMetadata } from 'next';
import { getProductById } from '@/utils/products'; 


type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await getProductById(params.slug);

  if (!product) {
    return {
      title: 'Ürün Bulunamadı',
      description: 'Aradığınız ürün şu anda mevcut değil.'
    };
  }

  const previousImages = (await parent).openGraph?.images || [];
  
  return {
    title: product.name,
    description: product.description,
    openGraph: {
        title: product.name,
        description: product.description,
        url: `${process.env.NEXTAUTH_URL}/products/${product.slug}`,
        images: [
            { url: product.imageUrl ?? '', width: 800, height: 600 },
            ...previousImages
        ],
        type: 'website' // Change the type to one of the allowed values
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: product.imageUrl
    }
  }
}
