import { handleFetchError } from '@/utils/fetch-boilerplate'
import { ProductProps } from './type'

const fetchProduct = async (sku: string): Promise<ProductProps> => {
    const fetchFn = async () => {
        const res = await fetch(`${process.env.PRODUCT_API_URL}/api/product/product/${sku}`)
        return { status: res.status, data: (await res.json()) as ProductProps }
    }
    return handleFetchError(fetchFn)
}

export default fetchProduct
