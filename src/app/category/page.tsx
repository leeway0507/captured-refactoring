import { fetchProductList } from "@/app/utils/hooks/data/product-list-fetch"
import { ProductSearchParmasProps } from "../utils/hooks/data/type"
import ProductList from "./infinite-scroll"

async function Page({ searchParams }: { searchParams: ProductSearchParmasProps }) {
    const productResponse = await fetchProductList(searchParams)
    return <ProductList productFilter={searchParams} productResponse={productResponse} />
}

export default Page