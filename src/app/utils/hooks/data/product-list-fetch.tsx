import { ProductFetchResponseProps, ProductFilterParamsProps, ProductSearchParmasProps } from './type'

export function convertObjToProductFilter(searchParams: Object) {
    // page 추출
    let pageNum = '1'

    if ('page' in searchParams) {
        pageNum = searchParams.page as string

        // eslint-disable-next-line no-param-reassign
        delete searchParams.page
    }

    const arr: [string, string][] = Object.entries(searchParams)
    const productFilter: ProductFilterParamsProps = {}

    // 필터 양식으로 변경
    arr.forEach(([key, value]) => {
        productFilter[key] = value.split(',')
    })

    return { pageNum, productFilter }
}

export const fetchProductList = async (searchParams: ProductSearchParmasProps) => {
    const { pageNum, productFilter } = convertObjToProductFilter(searchParams)
    const data: ProductFetchResponseProps = await fetch(
        `${process.env.PRODUCT_API_URL}/api/product/category?page=${pageNum}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productFilter),
        },
    ).then(async (r) => r.json())
    return data
}
