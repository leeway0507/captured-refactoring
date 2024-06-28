'use server'

import { fetchWithAuth, handleFetchError } from '@/utils/fetch-boilerplate'
import { AddressFormProps, AddressProps } from './type'

export const createAddress = async (address: AddressFormProps, accessToken: string) => {
    const url = `${process.env.AUTH_API_URL}/api/mypage/create-address`

    const fetchFn = () => fetchWithAuth(url, 'POST', accessToken, address)
    const errorCase = { 401: '권한이 없습니다.' }
    return handleFetchError(fetchFn, errorCase)
}

export const updateAddress = async (address: AddressFormProps, accessToken: string) => {
    const url = `${process.env.AUTH_API_URL}/api/mypage/update-address`
    const fetchFn = () => fetchWithAuth(url, 'POST', accessToken, address)
    const errorCase = { 401: '권한이 없습니다.' }
    return handleFetchError(fetchFn, errorCase)
}

export const deleteAddress = async (addressId: string, accessToken: string) => {
    const url = `${process.env.AUTH_API_URL}/api/mypage/delete-address`

    const fetchFn = () =>
        fetchWithAuth(url, 'POST', accessToken, {
            address_id: addressId,
        })

    const errorCase = { 401: '권한이 없습니다.' }

    return handleFetchError(fetchFn, errorCase)
}

export const getAddressAll = async (accessToken: string) => {
    const url = `${process.env.AUTH_API_URL}/api/mypage/get-address`
    const fetchFn = () => fetchWithAuth<AddressProps[]>(url, 'GET', accessToken)
    const errorCase = { 401: '권한이 없습니다.' }
    return handleFetchError(fetchFn, errorCase)
}

export const getAddressById = async (addressId: string, accessToken: string) => {
    const url = `${process.env.AUTH_API_URL}/api/mypage/get-address-info?address_id=${addressId}`
    const fetchFn = () => fetchWithAuth<AddressProps>(url, 'GET', accessToken)
    const errorCase = { 401: '권한이 없습니다.' }
    return handleFetchError(fetchFn, errorCase)
}
