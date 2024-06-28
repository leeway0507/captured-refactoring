'use server'

import { createAddress, deleteAddress, updateAddress } from '@/hooks/data/address-fetch'
import { auth } from '@/auth'
import { AddressFormProps, SignUpFormProps } from '@/hooks/data/type'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { register } from '@/hooks/data/auth-fetch'
import { signInAction } from '@/app/auth/actions/action'

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

export const signUpAction = async (data: SignUpFormProps) => {
    const { email, password, krName, ...rest } = data
    const userData = { email: email!, password: password!, krName }
    const addressData = { krName, ...rest }
    await register(userData, addressData).then(() =>
        signInAction({ email: email!, password: password!, redirectTo: '/mypage' }),
    )
}
