import { TProduct } from "@/app/types";

const getProduct = async (id: string): Promise<TProduct | null> => {
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products/${id}`);
      if (res.ok) {
        const product = await res.json();
        return product;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };

    export default getProduct;