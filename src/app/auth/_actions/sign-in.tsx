'use server'

import { signIn, signOut } from '@/auth'

export const signInAction = async (data: { email: string; password: string; redirectTo: string }) =>
    signIn('credentials', { ...data, redirect: true })

export const signOutAction = async () => signOut({ redirect: true, redirectTo: '/' })
