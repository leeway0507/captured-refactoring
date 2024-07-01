import dynamic from 'next/dynamic'
import { fetchProductList } from '@/actions/product'
import { ProductFilterSearchParamsProps } from '@/types'
import { Suspense } from 'react'
import Spinner from '@/components/spinner/spinner'
import Filter from './filter'

async function Product({ filterParams }: { filterParams: ProductFilterSearchParamsProps }) {
    const res = await fetchProductList(filterParams)
    const ProductList = dynamic(() => import('./product-list'), { ssr: false })
    const { page, ...pageParamsWithoutPage } = filterParams
    return <ProductList searchKey={pageParamsWithoutPage} productResponse={res} />
}

async function Page({ searchParams }: { searchParams: ProductFilterSearchParamsProps }) {
    return (
        <div className="page-max-frame grow flex flex-col w-full">
            <Suspense fallback={<Spinner />}>
                <Filter />
            </Suspense>
            <Suspense fallback={<Spinner />}>
                <Product filterParams={searchParams} />
            </Suspense>
        </div>
    )
}

export default Page
