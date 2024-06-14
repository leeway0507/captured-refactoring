'use client'

import { useEffect, useState } from 'react'
import { ProductProps } from './type'
import { saveToLocal, loadFromLocal } from '../../storage'

// localStorage 저장에 사용되는 key
const localKey = 'cr_t'

export interface ProductCartProps {
    product: ProductProps
    size: string
    qty: number
}

// 기존 리스트에 동일 제품 & 동일 사이즈가 존재하는지 확인
export const findProductIndex = (cartData: ProductCartProps[], product: ProductProps, selectedSize: string) =>
    cartData.findIndex((d) => d.product.sku === product.sku && d.size === selectedSize)

// 기존 리스트에 동일 제품 & 동일 사이즈가 존재하면, 수량 1 증가
export const updateProductQty = (
    cartData: ProductCartProps[],
    idx: number,
    setCartData: (a: ProductCartProps[]) => void,
) => {
    const updatedCartData = [
        ...cartData.slice(0, idx),
        { ...cartData[idx], qty: cartData[idx].qty + 1 },
        ...cartData.slice(idx + 1),
    ]
    return setCartData(updatedCartData)
}

// 기존 리스트에 동일 제품 & 동일 사이즈가 존재하지 않으면 신규 추가
export const addProductToCart = (
    cartData: ProductCartProps[],
    product: ProductProps,
    selectedSize: string,
    setCartData: (a: ProductCartProps[]) => void,
) => {
    const newProduct = { product, size: selectedSize, qty: 1 }
    return setCartData([...cartData, newProduct])
}

// 카트 리스트에 제품 추가
export const addToCartFn = (
    cartData: ProductCartProps[] | undefined,
    setCartData: (a: ProductCartProps[]) => void,
    product: ProductProps,
    selectedSize: string,
) => {
    // cartData undefined
    if (!cartData) return addProductToCart([], product, selectedSize, setCartData)

    // product && size already in cart
    const idx = findProductIndex(cartData, product, selectedSize)
    if (idx !== -1) return updateProductQty(cartData, idx, setCartData)

    // add new product to cart
    return addProductToCart(cartData, product, selectedSize, setCartData)
}

const useCart = () => {
    const [cartData, setCartData] = useState<ProductCartProps[]>()

    useEffect(() => {
        const cartArr = loadFromLocal<ProductCartProps[]>(localKey)
        setCartData(cartArr)
    }, [])

    useEffect(() => {
        saveToLocal(localKey, cartData)
    }, [cartData])

    const addToCart = (product: ProductProps, selectedSize: string) => {
        addToCartFn(cartData, setCartData, product, selectedSize)
    }

    return { addToCart, cartData }
}

export default useCart
