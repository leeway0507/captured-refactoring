import { logError } from '@/utils/log-error'
import { notFound } from 'next/navigation'
import { ProductProps } from './type'

const fetchProduct = async (sku: string): Promise<ProductProps> => {
    try {
        const response = await fetch(`${process.env.PRODUCT_API_URL}/api/product/product/${sku}`)

        if (!response.ok) {
            throw new Error(`Error fetching product with SKU: ${sku}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        logError(error)
        return notFound()
    }
}

export default fetchProduct
