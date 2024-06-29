'use server'

import { fetchWithAuth, handleFetchError } from '@/utils/fetch-boilerplate'
import { AddressFormProps, AddressProps } from '@/types'

import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

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

export const updateAddressAction = async (data: AddressFormProps, redirectUrl: string) => {
    const session = await auth()
    await updateAddress(data, session?.user.accessToken!)
    redirect(redirectUrl)
}

export const createAddressAction = async (data: AddressFormProps, redirectUrl: string) => {
    const session = await auth()
    await createAddress(data, session?.user.accessToken!)
    redirect(redirectUrl)
}

export const deleteAddressAction = async (formData: FormData) => {
    const addressId = formData.get('addressId')
    if (!addressId) throw new Error('address id is null')

    const session = await auth()
    await deleteAddress(addressId as string, session?.user.accessToken!)
    revalidatePath('/')
}
