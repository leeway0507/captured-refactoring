'use server'

import { signIn, signOut } from '@/auth'
import { AddressProps } from '@/hooks/data/type'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'
import { Step2State } from '../register/type'

export const signInAction = async (data: {
    email: string
    password: string
    redirectTo: string
}) => {
    try {
        await signIn('credentials', { ...data, redirect: false })
    } catch (error) {
        if (error) {
            const { cause } = error as AuthError
            // console.log('message', error.cause.err.message)
            switch (cause?.err?.message) {
                case 'Incorrect email or password':
                    return '비밀번호가 올바르지 않습니다.'
                case 'email not found':
                    return '등록된 이메일이 아닙니다.'
                default:
                    return '로그인 중 문제가 발생했습니다. 다시 시도해주세요.'
            }
        }
        return error
    }
    return redirect(data.redirectTo)
}

export const signOutAction = async () => signOut({ redirect: true, redirectTo: '/' })

export const signUp = async (userData: Step2State, addressData: AddressProps) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_registration: userData, address: addressData }),
    })
    return { status: res.status, data: await res.json() }
}
