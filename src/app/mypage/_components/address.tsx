import { getAddressAll } from '@/hooks/data/address-fetch'
import { AddressProps } from '@/hooks/data/type'
import { auth } from '@/auth'
import Link from 'next/link'
import { ItemGroup, ItemRow } from '@/components/item'
import AddressForm from './address-form'
import { deleteAddressAction } from '../_actions/action'

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

export function UpdateAddressButton({ addressId }: { addressId: string }) {
    return <Link href={`?updateAddress=${addressId}`}>수정</Link>
}

function DeleteAddressButton({ addressId }: { addressId: string }) {
    return (
        <form action={deleteAddressAction}>
            <input name="addressId" type="hidden" value={addressId} />
            <button type="submit" className="underline">
                삭제
            </button>
        </form>
    )
}

function ButtonGroup({ address }: { address: AddressProps }) {
    const isInitAddress = address.addressId?.endsWith('-0')
    return (
        <div className="underline absolute top-4 right-8 text-sm flex gap-4">
            {!isInitAddress && <DeleteAddressButton addressId={address.addressId!} />}
            <UpdateAddressButton addressId={address.addressId!} />
        </div>
    )
}

export function AddressInfoWithUpdateButton({ address }: { address: AddressProps }) {
    return (
        <div className="relative">
            <ButtonGroup address={address} />
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
    const addresses = (await getAddressAll(session?.user.accessToken!))

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

export async function AddressList() {
    const session = await auth()
    const addresses = await getAddressAll(session?.user.accessToken!)
    if (addresses.length === 0) return <NoAddress />
    return (
        <div className="max-w-lg mx-auto">
            {addresses.length < 4 && (
                <Link href="?updateAddress=new" className="flex justify-end pe-2 pb-2">
                    + 신규주소 추가
                </Link>
            )}
            <section className="space-y-4">
                {addresses.map((a) => (
                    <AddressInfoWithUpdateButton key={a.addressId} address={a} />
                ))}
            </section>
        </div>
    )
}
