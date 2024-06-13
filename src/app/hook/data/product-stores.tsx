'use client';

import { useEffect, useState } from 'react';
import { ProductDataStoreProps, ProductFetchResponseProps, ProductSearchParmasProps } from './type';

export const simpleHash = (s: string) => {
    const hash = s.split('').reduce((h: number, char: string) => {
        const charCode = char.charCodeAt(0);

        // eslint-disable-next-line no-bitwise
        return (h << 5) - h + charCode;
    }, 0);

    // eslint-disable-next-line no-bitwise
    return (hash >>> 0).toString(36).padStart(7, '0');
};


export const saveToLocal = (name: string, obj: Object | undefined) => obj && localStorage.setItem(name, JSON.stringify(obj))

export const loadFromLocal = <T,>(name: string): T | undefined => {
    const data = localStorage.getItem(name)
    return data ? JSON.parse(data) : undefined
}

export const checkAndUpdate = (
    localKey: string,
    ProductFilterParams: ProductSearchParmasProps,
    ProductFetchResponse: ProductFetchResponseProps,
) => {

    const localProductData = loadFromLocal<ProductDataStoreProps>(localKey)
    const filterHash = simpleHash(JSON.stringify(ProductFilterParams))
    const { data, currentPage, lastPage } = ProductFetchResponse

    // 신규 또는 필터 변경시 초기화
    const initCases = localProductData === undefined || localProductData.filter !== filterHash
    if (initCases) return { filter: filterHash, data: { [currentPage]: data }, lastPage: lastPage.toString() }

    // 기존과 변함 없다면
    const pages = Object.keys(localProductData.data)
    const hasPage = pages.find((v) => v === String(currentPage))
    if (hasPage) return localProductData

    // 기존 filter에 페이지만 업데이트 시
    return { filter: filterHash, data: { ...localProductData.data, [currentPage]: data }, lastPage: lastPage.toString() }



}


const useProductDataStore = (ProductFilterParams: ProductSearchParmasProps, ProductFetchResponse: ProductFetchResponseProps) => {
    const [dataStore, setDataStore] = useState<ProductDataStoreProps>();
    const localKey = "pr_d"

    useEffect(() => {
        const productDataStore = checkAndUpdate(localKey, ProductFilterParams, ProductFetchResponse)
        setDataStore(productDataStore)

        return () => {
            saveToLocal(localKey, productDataStore)
        }
    }, [ProductFilterParams, ProductFetchResponse])

    return dataStore
};



export default useProductDataStore;
