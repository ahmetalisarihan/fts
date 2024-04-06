import { TProduct } from "@/app/types";

const getProducts = async ():Promise<TProduct[] | null> => {
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products/`)
      if(res.ok) {
        const products = await res.json()
        return products
      }
    } catch (error) {
      console.log(error)
    }
    return null
  };

  export default getProducts;