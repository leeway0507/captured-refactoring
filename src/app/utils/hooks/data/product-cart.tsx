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

// 기존 리스트에 동일 제품 & 동일 사이즈가 존재하는지 확인하고 idx 반환
export const findProductIndex = (
    cartData: ProductCartProps[],
    product: ProductProps,
    selectedSize: string,
) => cartData.findIndex((d) => d.product.sku === product.sku && d.size === selectedSize)

// 기존 리스트에 동일 제품 & 동일 사이즈가 존재하면, 수량 1 증가
const updateProductQty = (
    updateType: 'increase' | 'decrease',
    cartData: ProductCartProps[],
    idx: number,
    setCartData: (a: ProductCartProps[]) => void,
) => {
    const obj = {
        increase: cartData[idx].qty + 1,
        decrease: cartData[idx].qty - 1,
    }
    const updatedCartData = [
        ...cartData.slice(0, idx),
        { ...cartData[idx], qty: obj[updateType] },
        ...cartData.slice(idx + 1),
    ]
    return setCartData(updatedCartData)
}

export const increaseQtyFn = (
    cartData: ProductCartProps[],
    setCartData: (a: ProductCartProps[]) => void,
    product: ProductProps,
    selectedSize: string,
) => {
    const idx = findProductIndex(cartData, product, selectedSize)
    updateProductQty('increase', cartData, idx, setCartData)
}

// 기존 리스트에 동일 제품 & 동일 사이즈가 존재하지 않으면 신규 추가
export const addProductToCart = (
    cartData: ProductCartProps[],
    setCartData: (a: ProductCartProps[]) => void,
    product: ProductProps,
    selectedSize: string,
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
    if (!cartData) return addProductToCart([], setCartData, product, selectedSize)

    // product && size already in cart
    const idx = findProductIndex(cartData, product, selectedSize)
    if (idx !== -1) return updateProductQty('increase', cartData, idx, setCartData)

    // add new product to cart
    return addProductToCart(cartData, setCartData, product, selectedSize)
}

export const removeToCartFn = (
    cartData: ProductCartProps[] | undefined,
    setCartData: (a: ProductCartProps[]) => void,
    product: ProductProps,
    selectedSize: string,
) => {
    // cartData undefined
    if (!cartData || cartData.length === 0) return null

    // product && size already in cart
    const idx = findProductIndex(cartData, product, selectedSize)
    const removeProduct = [...cartData.slice(0, idx), ...cartData.slice(idx + 1)]
    return setCartData(removeProduct)
}

export const decreaseQtyFn = (
    cartData: ProductCartProps[],
    setCartData: (a: ProductCartProps[]) => void,
    product: ProductProps,
    selectedSize: string,
) => {
    const idx = findProductIndex(cartData, product, selectedSize)
    const target = { ...cartData[idx] }

    if (target.qty < 2) {
        removeToCartFn(cartData, setCartData, target.product, target.size)
    } else {
        updateProductQty('decrease', cartData, idx, setCartData)
    }
}

const useCart = () => {
    const loadLocalData = () => {
        const cartArr = loadFromLocal<ProductCartProps[]>(localKey)
        return cartArr || []
    }
    const [cartData, setCartData] = useState<ProductCartProps[]>(loadLocalData)

    useEffect(() => {
        saveToLocal(localKey, cartData)
    }, [cartData])

    const addToCart = (product: ProductProps, selectedSize: string) => {
        addToCartFn(cartData, setCartData, product, selectedSize)
    }
    const removeToCart = (product: ProductProps, selectedSize: string) => {
        removeToCartFn(cartData, setCartData, product, selectedSize)
    }

    const increaseQty = (product: ProductProps, selectedSize: string) => {
        increaseQtyFn(cartData, setCartData, product, selectedSize)
    }
    const decreaseQty = (product: ProductProps, selectedSize: string) => {
        decreaseQtyFn(cartData, setCartData, product, selectedSize)
    }

    return { cartData, addToCart, removeToCart, increaseQty, decreaseQty }
}

export default useCart
