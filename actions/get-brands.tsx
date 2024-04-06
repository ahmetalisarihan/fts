import { TBrand } from "@/app/types"

const getBrands = async (): Promise<TBrand[] | null> => {
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/brands`)
      if(res.ok) {
        const brands = await res.json()
        return brands
      }
    } catch (error) {
      console.log(error)
    }
    return null
  }

  export default getBrands;