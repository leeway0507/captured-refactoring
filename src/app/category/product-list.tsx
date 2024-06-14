'use client'

import React from 'react'

import {
    ProductProps,
    ProductFetchResponseProps,
    ProductPagesProps,
    ProductSearchParmasProps,
} from '@/app/utils/hooks/data/type'
import { ProductCard } from '../utils/ui/product'
import useProductDataStore from '../utils/hooks/data/product-list-stores'
import updatePageParams from './product-infinite-scroll'
import useIntersectionObserver from '../utils/hooks/interaction/infinite-scroll'

function NoData() {
    return (
        <div className="flex flex-col mx-auto h-full tb:p-16 ">
            <div className="text-xl tb:text-3xl pb-2 m-auto">요청 결과가 존재하지 않습니다.</div>
        </div>
    )
}

function ProductCardGrid({ children }: { children: React.ReactNode }) {
    const productGrid = 'grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 page-container'
    return <div className={`${productGrid}`}>{children}</div>
}

function IntersectionTrigger({
    refer,
    page,
    lastPage,
}: {
    refer: React.RefObject<HTMLDivElement>
    page: string
    lastPage: string
}) {
    return <div ref={refer} data-page={page} data-last-page={lastPage} className="h-1" />
}

function InfiniteScrollProductCardArr({
    lastPage,
    page,
    data,
}: {
    lastPage: string
    page: string
    data: ProductProps[]
}) {
    const ref = useIntersectionObserver(updatePageParams)
    return (
        <>
            <ProductCardGrid>
                {data.map((product) => (
                    <ProductCard product={product} key={product.sku} />
                ))}
            </ProductCardGrid>
            <IntersectionTrigger refer={ref} page={page} lastPage={lastPage} />
        </>
    )
}

function ProductComponent({ productPages, lastPage }: { productPages: ProductPagesProps; lastPage: string }) {
    const productPageArr: [string, ProductProps[]][] = Object.entries(productPages)
    return productPageArr.map(([page, data]) => (
        <InfiniteScrollProductCardArr lastPage={lastPage} page={page} data={data} key={page} />
    ))
}

export default function ProductList({
    productFilter,
    productResponse,
}: {
    productFilter: ProductSearchParmasProps
    productResponse: ProductFetchResponseProps
}) {
    const ProductStores = useProductDataStore(productFilter, productResponse)

    // TODO:no Data 체크
    if (!ProductStores) return null
    if (!productResponse.data) return <NoData />
    return <ProductComponent productPages={ProductStores.data} lastPage={ProductStores.lastPage} />
}
