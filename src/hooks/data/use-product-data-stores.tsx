'use client'

import { saveToLocal, loadFromLocal } from '@/utils/storage'
import { simpleHash } from '@/utils/simple-hash'
import { ProductDataStoreProps, ProductFetchResponseProps } from '@/types'

export const updateProductDataStore = <T,>(
    searchKey: T,
    localProductData: ProductDataStoreProps | undefined,
    ProductFetchResponse: ProductFetchResponseProps,
) => {
    const filter = simpleHash(JSON.stringify(searchKey))
    const { data, currentPage: newPage, lastPage } = ProductFetchResponse

    // 신규 또는 필터 변경시 초기화
    const noData = localProductData === undefined
    const newFilter = localProductData && localProductData.filter !== filter
    const initCases = noData || newFilter // noData or newFilter

    if (initCases) return { filter, data: { [newPage]: data }, lastPage: lastPage.toString() }

    // 기존과 변함 없다면
    const localPages = Object.keys(localProductData.data)
    const isPageExist = localPages.find((v) => v === String(newPage))

    if (isPageExist) return localProductData

    // 기존 filter에 페이지만 업데이트 시
    return {
        filter,
        data: { ...localProductData.data, [newPage]: data },
        lastPage: lastPage.toString(),
    }
}

const useProductDataStore = <T,>(searchKey: T, ProductFetchResponse: ProductFetchResponseProps) => {
    const localKey = 'pr_d'
    const localProductDataStore = loadFromLocal<ProductDataStoreProps>(localKey)
    const ProductDataStore = updateProductDataStore(
        searchKey,
        localProductDataStore,
        ProductFetchResponse,
    )
    const isProductDataStoreUpdated =
        JSON.stringify(localProductDataStore) !== JSON.stringify(ProductDataStore)

    if (isProductDataStoreUpdated) {
        saveToLocal(localKey, ProductDataStore)
    }

    return ProductDataStore
}

export default useProductDataStore
