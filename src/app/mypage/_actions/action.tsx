'use server'

import { createAddress, updateAddress } from '@/hooks/data/address-fetch'
import { auth } from '@/auth'
import { AddressFormProps } from '@/hooks/data/type'
import { signUp } from '@/app/auth/_actions/action'

export const updateAddrressAction = async (data: AddressFormProps) => {
    const session = await auth()
    await updateAddress(data, session?.user.accessToken!)
}

export const createAddrressAction = async (data: AddressFormProps) => {
    const session = await auth()
    await createAddress(data, session?.user.accessToken!)
}

export const signUpAction = async (data: AddressFormProps) => {
    const { email, password, krName, ...rest } = data
    const userData = { email: email!, password: password!, krName }
    const addressData = { krName, ...rest }
    await signUp(userData, addressData)
}
