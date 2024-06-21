'use server'

import { signIn } from '@/auth'

export const signInAction = async (data: { email: string; password: string }) =>
    signIn('credentials', data)
