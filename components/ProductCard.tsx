import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface IProductCard {
  id: string;
  name: string;
  image?: string;
}

const ProductCard: React.FC<IProductCard> = ({ id, name, image }) => {
  return (
    <Link href={`/products/${id}`}>
      <div className="border rounded-lg p-4 hover:shadow-md">
        <div className="aspect-w-9 aspect-h-9">
          {image ? (
            <Image src={image} alt={name} className='shadow bg-cover rounded-lg overflow-hidden border' width={300} height={300} />
          ) : (
            <div className="bg-gray-200 rounded-lg"></div>
          )}
        </div>
        <h3 className="text-lg font-medium mt-4">{name}</h3>
      </div>
    </Link>
  );
};

export default ProductCard;