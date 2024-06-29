import { handleFetchError } from '@/utils/fetch-boilerplate'
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

export const fetchSearchList = async (keyword: string): Promise<ProductProps[]> => {
    const fetchFn = async () => {
        const res = await fetch(
            `${process.env.PRODUCT_API_URL}/api/product/search?keyword=${keyword}`,
        )
        return { status: res.status, data: (await res.json()) as ProductProps[] }
    }
    return handleFetchError(fetchFn)
}
