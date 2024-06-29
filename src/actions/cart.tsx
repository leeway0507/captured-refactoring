'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export const setCartItemsToCookies = async (cartItemsString: string) => {
    cookies().set('pd_ck', cartItemsString, { maxAge: 300 })
    redirect('/order')
}
