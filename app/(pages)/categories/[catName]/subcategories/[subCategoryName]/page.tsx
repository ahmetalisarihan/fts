// import { GetServerSidePropsContext } from 'next'; 
// import { TProduct } from '@/app/types';
// import ProductCard from '@/components/ProductCard'; // Ürün kartı bileşeni

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const { categoryName, subCategoryName } = context.query;

//   const getProducts = async (
//     categoryName: string | string[] | undefined,
//     subCategoryName: string | string[] | undefined
//     ): Promise<TProduct[] | null> => {
//     try {
//       const url = new URL(`${process.env.NEXTAUTH_URL}/api/products/`);
//       if (categoryName) url.searchParams.set('catName', categoryName);
//       if (subCategoryName) url.searchParams.set('subcatName', subCategoryName);
  
//       const res = await fetch(url);
//       if (res.ok) {
//         const products = await res.json();
//         return products;
//       }
//     } catch (error) {
//       console.log(error);
//     }
//     return null;
//   };

//   const products = await getProducts(categoryName, subCategoryName);

//   return {
//     props: {
//       products,
//       categoryName,
//       subCategoryName,
//     },
//   };
// }

// const SubcategoryProductList = ({ products, categoryName, subCategoryName }) => {
//   return (
    
//       <h1>{categoryName} `&gt;` {subCategoryName}</h1> 
//       {/* Ürünleri listeleyin */}
//       {products.map((product) => (
        
//           {product.name}
        
//       ))}
    
//   );
// };

// export default SubcategoryProductList;