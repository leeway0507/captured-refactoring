'use server'

import { OrderInfoProps, OrderProductProps } from './type'

export const getOrderInfo = async (accessToken: string) => {
    const res = await fetch(`${process.env.AUTH_API_URL}/api/order/get-order-history`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    })

    return { status: res.status, data: (await res.json()) as OrderInfoProps[] }
}

export const getOrderRow = async (ordreId: string, accessToken: string) => {
    const res = await fetch(
        `${process.env.AUTH_API_URL}/api/order/get-order-row?order_id=${ordreId}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        },
    )

    return { status: res.status, data: (await res.json()) as OrderProductProps[] }
}
