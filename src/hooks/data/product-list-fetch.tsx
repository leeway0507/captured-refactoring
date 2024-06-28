import { logError } from '@/utils/log-error'
import { ProductFetchResponseProps, ProductFilterSearchParamsProps, ProductProps } from './type'

export function convertObjToProductFilter(searchParams: ProductFilterSearchParamsProps) {
    let pageNum = '1'

    const modifiedSearchParams = { ...searchParams }

    if ('page' in modifiedSearchParams) {
        pageNum = modifiedSearchParams.page as string
        delete modifiedSearchParams.page
    }

    if ('price' in modifiedSearchParams) {
        const priceString = modifiedSearchParams.price as string
        const priceArr = priceString.split(',').map((d) => Number(d))
        modifiedSearchParams.price = priceArr
    }

    const productFilter = JSON.stringify(modifiedSearchParams)
    return { pageNum, productFilter }
}

export const fetchProductList = async (
    searchParams: ProductFilterSearchParamsProps,
): Promise<ProductFetchResponseProps> => {
    try {
        const { pageNum, productFilter } = convertObjToProductFilter(searchParams)
        const response = await fetch(
            `${process.env.PRODUCT_API_URL}/api/product/category?page=${pageNum}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: productFilter,
            },
        )

        const data = await response.json()
        if (!response.ok) throw new Error(`fetchProductList: ${JSON.stringify(data)}`)

        return data
    } catch (error) {
        logError(error)
        return {
            data: [],
            currentPage: 1,
            lastPage: 1,
        }
    }
}

export const fetchSearchList = async (keyword: string): Promise<ProductProps[]> => {
    try {
        const res = await fetch(
            `${process.env.PRODUCT_API_URL}/api/product/search?keyword=${keyword}`,
        )
        const j = await res.json()
        if (!res.ok) {
            throw new Error(`fetchProductList : ${JSON.stringify(j.data)}`)
        }
        return j.data
    } catch (error) {
        logError(error)
        return []
    }
}
