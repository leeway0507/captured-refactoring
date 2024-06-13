import { fetchProduct } from "@/app/hook/data/product-fetch"
import { ProductSearchParmasProps } from "../hook/data/type"
import Product from "./product-card"

async function Page({ searchParams }: { searchParams: ProductSearchParmasProps }) {
    const productResponse = await fetchProduct(searchParams)
    return <Product productFilter={searchParams} productResponse={productResponse} />
}

export default Page