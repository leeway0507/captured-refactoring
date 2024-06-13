import fetchProduct from '@/app/utils/hooks/data/product-fetch'
import { productMetaData, JsonLDComponent } from './metadata'
import Product from '../product'

interface ParamsProps {
    sku: string
}
export async function generateMetadata({ params }: { params: ParamsProps }) {
    const product = await fetchProduct(params.sku)
    return productMetaData(product)
}

async function Page({ params }: { params: ParamsProps }) {
    const product = await fetchProduct(params.sku)
    return (
        <>
            <JsonLDComponent product={product} />
            <Product product={product} />
        </>
    )
}

export default Page
