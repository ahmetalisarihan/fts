import Link from 'next/link';
import Image from 'next/image';
import { TProduct } from '@/app/types';
import noimage from '@/public/noimage.png';

interface ProductCardProps {
  product: TProduct;
}

const RecommendedProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/products/${product.id}`} className="border rounded-lg p-4 hover:shadow-md flex flex-col items-center "> 
      <div className="aspect-w-6 aspect-h-6 object-cover overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={150}
            height={150}
            className="w-40 h-40 "
          />
        ) : (
          <Image
            src={noimage}
            alt="Resim Yok"
            width={150}
            height={150}
            className="w-40 h-40 "
          />
        )}
      </div>
      <h3 className="text-lg font-medium mt-4">{product.name}</h3>  
    </Link>
  );
};

export default RecommendedProductCard;
