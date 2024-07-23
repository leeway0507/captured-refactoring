'use client'

import { saveToLocal, loadFromLocal } from '@/utils/storage'
import { ProductProps } from '@/types'

const localKey = 'rc_v'

const findDuplicateProduct = (product: ProductProps, recentView: ProductProps[]) =>
    recentView.findIndex((p) => p.sku === product.sku)

// 최신순으로 정렬
// 1부터 10 순서로 데이터 삽입 시 결과 [10,9,8,7,6,5,4,3,2,1]
export const addProductToRecentView = (
    maxViewSize: number,
    product: ProductProps,
    recentView: ProductProps[] | undefined,
) => {
    // 최근 항목이 없거나 빈 경우
    const isRecentViewEmpty = !recentView || recentView.length === 0
    if (isRecentViewEmpty) return [product]

    // 신규 recentView 정의
    const updatedRecentView = [...recentView]
    const duplicatedProductIndex = findDuplicateProduct(product, recentView)
    const isProductInRecentView = duplicatedProductIndex !== -1

    // recentView가 정한 사이즈보다 큰 경우
    if (recentView.length >= maxViewSize) {
        if (isProductInRecentView) {
            // 중복 product 제거
            updatedRecentView.splice(duplicatedProductIndex, 1)
        } else {
            // 가장 오래된 product 제거
            updatedRecentView.pop()
        }
        // 신규 product 삽입
        updatedRecentView.unshift(product)
        return updatedRecentView
    }

    // recentView가 정한 사이즈 내 위치한 경우
    if (isProductInRecentView) {
        updatedRecentView.splice(duplicatedProductIndex, 1)
    }
    return [product, ...updatedRecentView]
}

const useRecentView = (product: ProductProps, maxViewSize: number = 10) => {
    const prevRecentView = loadFromLocal<ProductProps[]>(localKey)
    const lastRecentView = addProductToRecentView(maxViewSize, product, prevRecentView)

    if (JSON.stringify(prevRecentView) !== JSON.stringify(lastRecentView))
        saveToLocal(localKey, lastRecentView)

    return prevRecentView
}

export default useRecentView
