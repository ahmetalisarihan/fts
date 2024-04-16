// import React, { useState } from 'react';
// import SearchBar from '../components/SearchBar';
// import ProductCard from './ProductCard'; // ProductCard bileşenini içe aktarın
// import { TProduct } from "@/app/types";

// interface SearchPageProps {
//   searchParams: { query: string };
// }

// export default function SearchPage({ searchParams }: SearchPageProps) {
//   const [searchResults, setSearchResults] = useState<TProduct[]>([]);

//   const handleSearch = (products: TProduct[]) => {
//     setSearchResults(products);
//   };

//   return (
//     <div>
//       <SearchBar onSearch={handleSearch} />
//       <div>
//         {searchResults && searchResults.length > 0 &&
//           searchResults.map((product: TProduct) => (
//             <ProductCard key={product.id} product={product} />
//           ))
//         }
//         {searchResults.length === 0 && <div className="py-6">Ürün bulunamadı</div>}
//       </div>
//     </div>
//   );
// }