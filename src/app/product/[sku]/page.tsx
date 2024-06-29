import { fetchProduct } from '@/actions/product'
import { Suspense } from 'react'
import Spinner from '@/components/spinner/spinner'
import { productMetaData, JsonLDComponent } from './metadata'
import Product from './components'

interface ParamsProps {
    sku: string
}

export async function generateMetadata({ params }: { params: ParamsProps }) {
    const product = await fetchProduct(params.sku)
    return productMetaData(product)
}

async function ProductWrapper({ sku }: { sku: string }) {
    const product = await fetchProduct(sku)
    return <Product product={product} />
}

async function Page({ params }: { params: ParamsProps }) {
    const { sku } = params
    return (
        <>
            <Suspense>
                <JsonLDComponent sku={sku} />
            </Suspense>
            <div className="page-container page-max-frame">
                <Suspense fallback={<Spinner />}>
                    <ProductWrapper sku={sku} />
                </Suspense>
            </div>
        </>
    )
}

export default Page
