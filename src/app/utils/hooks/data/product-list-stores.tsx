'use client'

import { ProductDataStoreProps, ProductFetchResponseProps, ProductSearchParmasProps } from './type'
import { saveToLocal, loadFromLocal } from '../../storage'

export const simpleHash = (s: string) => {
    const hash = s.split('').reduce((h: number, char: string) => {
        const charCode = char.charCodeAt(0)

        // eslint-disable-next-line no-bitwise
        return (h << 5) - h + charCode
    }, 0)

    // eslint-disable-next-line no-bitwise
    return (hash >>> 0).toString(36).padStart(7, '0')
}

export const loadUpdatedProductDataStore = (
    localProductData: ProductDataStoreProps | undefined,
    ProductFilterParams: ProductSearchParmasProps,
    ProductFetchResponse: ProductFetchResponseProps,
) => {
    const filterHash = simpleHash(JSON.stringify(ProductFilterParams))
    const { data, currentPage, lastPage } = ProductFetchResponse

    // 신규 또는 필터 변경시 초기화
    const initCases = localProductData === undefined || localProductData.filter !== filterHash
    if (initCases)
        return { filter: filterHash, data: { [currentPage]: data }, lastPage: lastPage.toString() }

    // 기존과 변함 없다면
    const pages = Object.keys(localProductData.data)
    const hasPage = pages.find((v) => v === String(currentPage))
    if (hasPage) return localProductData

    // 기존 filter에 페이지만 업데이트 시
    return {
        filter: filterHash,
        data: { ...localProductData.data, [currentPage]: data },
        lastPage: lastPage.toString(),
    }
}

const useProductDataStore = (
    ProductFilterParams: ProductSearchParmasProps,
    ProductFetchResponse: ProductFetchResponseProps,
) => {
    const localKey = 'pr_d'
    const prevProductDataStore = loadFromLocal<ProductDataStoreProps>(localKey)
    const updatedProductDataStore = loadUpdatedProductDataStore(
        prevProductDataStore,
        ProductFilterParams,
        ProductFetchResponse,
    )

    if (JSON.stringify(prevProductDataStore) !== JSON.stringify(updatedProductDataStore))
        saveToLocal(localKey, updatedProductDataStore)

    return updatedProductDataStore
}

export default useProductDataStore
