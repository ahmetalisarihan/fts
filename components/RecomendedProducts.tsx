import { TProduct } from '@/app/types';
import React from 'react'
import { useQuery } from 'react-query';


const RecomendedProducts: React.FC = async () => {

    const { data: recomendedProducts} = useQuery('recomendedProducts', async () => {
        const response = await fetch('/api/recommended-products');
        return response.json();
        }
        );
    
  return (
    <div>
        <h2>Önerilen Ürünler</h2>
        <div>
            {recomendedProducts?.map((product: TProduct) => (
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <img src={product.imageUrl} alt={product.name} />
                </div>
            ))}
        </div>
    </div>
  )
}

export default RecomendedProducts