import { auth } from '@/auth'
import { getAddressAll } from '@/actions/address'
import Link from 'next/link'
import CatchError from '@/utils/error/handle-fetch-error'
import { AddressForm } from './address-form'

export function UpdateAddressButton({ addressId }: { addressId: string }) {
    return <Link href={`?updateAddress=${addressId}`}>수정</Link>
}

export async function UpdateAddressForm({ addressId }: { addressId: string | 'new' }) {
    const session = await auth()
    const addresses = await getAddressAll(session?.user.accessToken!).then(CatchError)

    const defaultValue = addressId === 'new' ? {} : addresses.find((a) => a.addressId === addressId)

    return (
        <div className="max-w-lg mx-auto">
            <AddressForm
                defaultValue={defaultValue}
                formType={addressId === 'new' ? 'new' : 'update'}
                redirectTo="/mypage"
            />
        </div>
    )
}
