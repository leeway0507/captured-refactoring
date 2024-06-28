'use server'

import { fetchWithAuth, handleFetchError } from '@/utils/fetch-boilerplate'
import { Step2State } from '@/app/auth/register/type'
import { AddressFormProps } from './type'

export const getTokenByEmailAndName = async (email: string, username: string) => {
    const url = `${process.env.AUTH_API_URL}/api/auth/check-email-and-name?email=${email}&name=${username}`
    const fetchFn = async () => {
        const res = await fetch(url)
        return { status: res.status, data: (await res.json()) as { token: string } }
    }

    return handleFetchError(fetchFn)
}
export const fetchResetPassword = async (accessToken: string, password: string) => {
    const url = `${process.env.AUTH_API_URL}/api/mypage/resset-password`
    const fetchFn = () => fetchWithAuth(url, 'POST', accessToken, { password })
    return handleFetchError(fetchFn)
}

export const verifyEmailCode = async (email: string, code: string) => {
    const url = `${process.env.AUTH_API_URL}/api/auth/verify-code?email=${email}&code=${code}`
    const fetchFn = async () => {
        const res = await fetch(url)
        return { status: res.status, data: (await res.json()) as string }
    }
    const errorCase = { 406: '코드가 일치하지 않습니다.' }
    return handleFetchError(fetchFn, errorCase)
}

export const sendEmailCode = async (email: string) => {
    const url = `${process.env.AUTH_API_URL}/api/auth/resend-code-to-email?email=${email}`
    const fetchFn = async () => {
        const res = await fetch(url)
        return { status: res.status, data: (await res.json()) as string }
    }

    return handleFetchError(fetchFn)
}

export const checkEmailDuplication = async (email: string) => {
    const url = `${process.env.AUTH_API_URL}/api/auth/email-check?email=${email}`
    const fetchFn = async () => {
        const res = await fetch(url)
        return { status: res.status, data: (await res.json()) as string }
    }
    const errorCase = { 409: '이미 가입 된 계정입니다.' }
    return handleFetchError(fetchFn, errorCase)
}

export const register = async (user_registration: Step2State, address: AddressFormProps) => {
    const url = `${process.env.AUTH_API_URL}/api/auth/register`
    const fetchFn = async () => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_registration, address }),
        })
        return { status: res.status, data: (await res.json()) as string }
    }

    return handleFetchError(fetchFn)
}
