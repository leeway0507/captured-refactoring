'use server'

import { handleFetchError } from '@/utils/fetch-boilerplate'
import { ProductFetchResponseProps, ProductFilterSearchParamsProps, ProductProps } from '@/types'
import { convertObjToProductFilter } from '@/utils/filter'

export const fetchProduct = async (sku: string): Promise<ProductProps> => {
    const fetchFn = async () => {
        const res = await fetch(`${process.env.PRODUCT_API_URL}/api/product/product/${sku}`)
        return { status: res.status, data: (await res.json()) as ProductProps }
    }
    return handleFetchError(fetchFn)
}

export const fetchProductList = async (
    searchParams: ProductFilterSearchParamsProps,
): Promise<ProductFetchResponseProps> => {
    const fetchFn = async () => {
        const { pageNum, productFilter } = convertObjToProductFilter(searchParams)
        const res = await fetch(
            `${process.env.PRODUCT_API_URL}/api/product/category?page=${pageNum}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: productFilter,
            },
        )
        return { status: res.status, data: (await res.json()) as ProductFetchResponseProps }
    }
    return handleFetchError(fetchFn)
}

export const fetchSearchList = async (keyword: string): Promise<{ data: ProductProps[] }> => {
    const fetchFn = async () => {
        const res = await fetch(
            `${process.env.PRODUCT_API_URL}/api/product/search?keyword=${keyword}`,
        )
        return { status: res.status, data: (await res.json()) as { data: ProductProps[] } }
    }
    return handleFetchError(fetchFn)
}
