import fetchProduct from '@/hooks/data/product-fetch'
import { productMetaData, JsonLDComponent } from './metadata'
import Nav from '../../static/nav'
import Product from './product'

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
            <Nav hideMobileBottom />
            <main className="page-container page-max-frame">
                <Product product={product} />
            </main>
        </>
    )
}

export default Page
