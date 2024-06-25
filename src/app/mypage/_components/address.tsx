import { getAddressAll } from '@/hooks/data/address-fetch'
import { AddressProps } from '@/hooks/data/type'
import { auth } from '@/auth'
import Link from 'next/link'
import { ItemGroup, ItemRow } from '@/components/item'
import AddressForm from './address-form'

function SkeletonAddressInfo() {
    return <div className="h-48 bg-gray-50 w-full" />
}

export function AddressInfo({ address }: { address: AddressProps | undefined }) {
    const container = 'w-full px-4 md:px-8 py-4 bg-gray-100 rounded-lg'
    const nameBasis = 'basis-1/4'
    const valueBasis = 'basis-3/4'
    if (!address) return <SkeletonAddressInfo />
    return (
        <ItemGroup className={`${container}`}>
            <ItemRow
                name="성명"
                value={`${address.krName}(${address.enName})`}
                nameBasis={nameBasis}
                valueBasis={valueBasis}
            />
            <ItemRow
                name="통관번호"
                value={address.customId}
                nameBasis={nameBasis}
                valueBasis={valueBasis}
            />
            <ItemRow
                name="휴대폰번호"
                value={address.phone}
                nameBasis={nameBasis}
                valueBasis={valueBasis}
            />
            <ItemRow
                name="한글주소"
                value={`${address.krAddress}(${address.krAddressDetail})`}
                nameBasis={nameBasis}
                valueBasis={valueBasis}
            />
            <ItemRow
                name="영문주소"
                value={`${address.enAddress} (${address.enAddressDetail})`}
                nameBasis={nameBasis}
                valueBasis={valueBasis}
            />
        </ItemGroup>
    )
}

function AddressUpdateButton({ addressId }: { addressId: string }) {
    return (
        <Link
            href={`?updateAddress=${addressId}`}
            className="underline absolute top-4 right-8 text-sm"
        >
            수정
        </Link>
    )
}

function AddressInfoWithUpdateButton({ address }: { address: AddressProps }) {
    return (
        <div className="relative">
            <AddressUpdateButton addressId={address.addressId!} />
            <AddressInfo address={address} />
        </div>
    )
}

function NoAddress() {
    return (
        <div className="flex-center flex-col py-8 text-xl">
            <span className="text-2xl">등록된 주소가 없습니다.</span>
            <Link href="?updateAddress=new">address</Link>
        </div>
    )
}

export async function UpdateAddressForm({ addressId }: { addressId: string | 'new' }) {
    const session = await auth()
    const addresses = (await getAddressAll(session?.user.accessToken!)).data

    const defaultValue = addressId === 'new' ? {} : addresses.find((a) => a.addressId === addressId)

    return (
        <div className="max-w-lg mx-auto">
            <AddressForm
                formType={addressId === 'new' ? 'new' : 'update'}
                defaultValue={defaultValue}
            />
        </div>
    )
}

export async function AddressList() {
    const session = await auth()
    const addresses = (await getAddressAll(session?.user.accessToken!)).data
    if (addresses.length === 0) return <NoAddress />
    return (
        <div className="max-w-lg mx-auto">
            {addresses.length < 4 && (
                <Link href="?updateAddress=new" className="flex justify-end pe-2 pb-2">
                    + 신규주소 추가
                </Link>
            )}
            {addresses.map((a) => (
                <AddressInfoWithUpdateButton key={a.addressId} address={a} />
            ))}
        </div>
    )
}
