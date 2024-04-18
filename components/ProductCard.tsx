import Link from 'next/link';
import Image from 'next/image';
import { TProduct } from '@/app/types';
import noimage from '@/public/noimage.png';

interface ProductCardProps {
  product: TProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/products/${product.id}`} className="border rounded-lg p-4 hover:shadow-md flex flex-col items-center transform transition duration-500 hover:scale-105">
      <div> {/* Bu div etiketi, ürün kartının tamamını kapsar */}
        <div className="aspect-w-9 aspect-h-9 object-cover overflow-hidden">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={200}
              height={200}
              className="w-60 h-60"
            />
          ) : (
            <Image
              src={noimage}
              alt="Resim Yok"
              width={200}
              height={200}
              className="w-60 h-60"
            />
          )}
        </div>
        <h3 className="text-lg font-medium mt-4">{product.name}</h3>
      </div> {/* div etiketi kapatıldı */}
    </Link>
  );
};

export default ProductCard;