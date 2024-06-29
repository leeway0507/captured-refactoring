'use server'

import { fetchWithAuth, handleFetchError } from '@/utils/fetch-boilerplate'
import {
    OrderHistoryProps,
    OrderItemProps,
    ProductCartProps,
    CheckCartItemResultProps,
} from '@/types'

export const getOrderHistory = async (accessToken: string) => {
    const url = `${process.env.AUTH_API_URL}/api/order/get-order-history`
    const fetchFn = () => fetchWithAuth<OrderHistoryProps[]>(url, 'GET', accessToken)
    const errorCase = { 401: '권한이 없습니다.' }
    return handleFetchError(fetchFn, errorCase)
}

export const getOrderItem = async (orderId: string, accessToken: string) => {
    const url = `${process.env.AUTH_API_URL}/api/order/get-order-row?order_id=${orderId}`
    const fetchFn = () => fetchWithAuth<OrderItemProps[]>(url, 'GET', accessToken)
    const errorCase = { 401: '권한이 없습니다.' }
    return handleFetchError(fetchFn, errorCase)
}

export const checkCartItems = async (cartItems: ProductCartProps[]) => {
    const data = {
        form: cartItems.map((v) => `${v.product.sku}-${v.product.size}`),
        sku: cartItems.map((v) => v.product.sku),
    }

    const fetchFn = async () => {
        const res = await fetch(`${process.env.AUTH_API_URL}/api/order/check-size`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        return { status: res.status, data: (await res.json()) as CheckCartItemResultProps }
    }

    const errorCase = { 401: '권한이 없습니다.' }
    return handleFetchError(fetchFn, errorCase)
}
