import { ProductProps } from './type'

const fetchProduct = async (sku: string) => {
    const req = await fetch(`${process.env.PRODUCT_API_URL}/api/product/product/${sku}`)
    const data: ProductProps = await req.json()
    return data
}

export default fetchProduct