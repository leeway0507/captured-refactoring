'use client'

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ProductFilterParamsProps } from './type'

export const applyFilterToURLFn = (
    filterParams: ProductFilterParamsProps,
    router: AppRouterInstance,
) => {
    const urlWithoutSearchParams = window.location.href.split('?')[0]
    const newURL = new URL(urlWithoutSearchParams)

    // update SearchParams
    Object.entries(filterParams).map(([k, v]) => newURL.searchParams.set(k, v.join()))
    router.push(newURL.href, { scroll: false })
}

export const getFilterParams = (): ProductFilterParamsProps | undefined => {
    if (typeof window !== 'undefined') {
        const url = new URL(window.location.href)
        const { searchParams } = url

        searchParams.delete('page')

        // Use reduce to convert the search parameters into an object
        const filterParams = Array.from(searchParams.entries()).reduce(
            (acc, [key, value]) => ({ ...acc, [key]: value.split(',') }),
            {},
        )
        return filterParams
    }
    return undefined
}

export const useFilterParams = () => {
    const router = useRouter()
    const [filterState, setFilterState] = useState<ProductFilterParamsProps>(
        getFilterParams() || {},
    )
    const prevFilterSate = getFilterParams() || {}

    const applyFilterToURL = () => {
        if (filterState) applyFilterToURLFn(filterState, router)
    }
    const resetFilterState = () => {
        if (filterState) setFilterState(prevFilterSate)
    }
    return { filterState, setFilterState, applyFilterToURL, resetFilterState }
}

// filter PageType

type PageType = '의류' | '신발' | '전체' | '기타'
const VALID_PAGE_TYPES: PageType[] = ['의류', '신발', '전체', '기타']

const isPageType = (pageType: string): pageType is PageType =>
    VALID_PAGE_TYPES.includes(pageType as PageType)

export const usePageType = (): PageType => {
    const searchParams = useSearchParams()
    const pageType = searchParams.get('pageType')

    return pageType && isPageType(pageType) ? (pageType as PageType) : '전체'
}
