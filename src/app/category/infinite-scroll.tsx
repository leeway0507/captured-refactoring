'use client'

import React from 'react'

import {
    ProductProps,
    ProductFetchResponseProps,
    ProductPagesProps,
    ProductSearchParmasProps,
} from '@/app/utils/hooks/data/type'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { ProductCard } from '../utils/ui/product'
import useProductDataStore from '../utils/hooks/data/product-list-stores'

import useIntersectionObserver from '../utils/hooks/interaction/infinite-scroll'
import { ScrollDirectionProps } from '../utils/hooks/interaction/scroll-direction'
import Filter from './filter'

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

export const getNextPageNum = (scrollDirection: ScrollDirectionProps, currPage: string) =>
    scrollDirection && scrollDirection === 'up' ? currPage : String(Number(currPage) + 1)

export const updatePageParams = (
    ref: React.RefObject<HTMLDivElement>,
    router: AppRouterInstance,
    scrollDirection: ScrollDirectionProps,
) => {
    const url = new URL(window.location.href)
    const { searchParams } = url

    // 현재 페이지 추출
    const currPage = ref.current && ref.current.getAttribute('data-page')
    const lastPage = ref.current && ref.current.getAttribute('data-last-page')

    if (currPage && lastPage && currPage < lastPage) {
        // 다음 페이지 추출 및 URL 업데이트
        const pageNum = getNextPageNum(scrollDirection, currPage)
        searchParams.set('page', pageNum)
        router.push(url.toString(), { scroll: false })
    }
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

function ProductComponent({
    productPages,
    lastPage,
}: {
    productPages: ProductPagesProps
    lastPage: string
}) {
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
    return (
        <div className="flex flex-col gap-2">
            <Filter />
            <ProductComponent productPages={ProductStores.data} lastPage={ProductStores.lastPage} />
        </div>
    )
}