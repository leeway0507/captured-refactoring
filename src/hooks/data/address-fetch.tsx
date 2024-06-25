'use server'

import { AddressFormProps, AddressProps } from './type'

export const createAddress = async (address: AddressFormProps, accessToken: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/mypage/create-address`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(address),
    })

    return { status: res.status, data: await res.json() }
}

export const updateAddress = async (address: AddressFormProps, accessToken: string) => {
    const res = await fetch(`${process.env.AUTH_API_URL}/api/mypage/update-address`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(address),
    })
    return { status: res.status, data: await res.json() }
}

export const getAddressAll = async (accessToken: string) => {
    const res = await fetch(`${process.env.AUTH_API_URL}/api/mypage/get-address`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    })
    return { status: res.status, data: (await res.json()) as AddressProps[] }
}

export const getAddressById = async (addressId: string, accessToken: string) => {
    const res = await fetch(
        `${process.env.AUTH_API_URL}/api/mypage/get-address-info?address_id=${addressId}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        },
    )
    return { status: res.status, data: (await res.json()) as AddressProps }
}
