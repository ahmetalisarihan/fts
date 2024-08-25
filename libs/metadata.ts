import { Metadata, ResolvingMetadata } from 'next';
import { TProduct } from '@/app/types';
import { getProducts } from './getProducts';

export async function generateProductMetadata(
  slug: string,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const products = await getProducts();
    const product = products?.find((p) => p.slug === slug);

    const previousImages = (await parent).openGraph?.images || [];
    const metadataBase = process.env.NEXTAUTH_URL || 'http://localhost:3000';

    return {
      title: `${product?.name || ''} - ${product?.metaTitle || 'FTS'}`,
      description: product?.metaDescription || '',
      keywords: product?.metaKeywords || '',
      openGraph: {
        title: `${product?.name || ''} - ${product?.metaTitle || 'FTS'}`,
        description: product?.metaDescription || '',
        images: [
          `${metadataBase}${product?.imageUrl || '/public/logo.png'}`,
          ...previousImages.map((img) => `${metadataBase}${img}`),
        ],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    throw new Error('Error generating metadata');
  }
}
