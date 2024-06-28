import { cookies } from 'next/headers'
import { auth } from '@/auth'
import { Session } from 'next-auth'
import React, { Suspense } from 'react'
import { redirect } from 'next/navigation'

import { ProductCartProps } from '@/hooks/data/type'
import { getAddressAll } from '@/hooks/data/address-fetch'
import { PaymentProvider } from '@/components/context/payment-provider'
import Spinner from '@/components/spinner/spinner'
import { checkCartItems } from '@/hooks/data/order-fetch'
import { ProductHorizontalCard } from '../mypage/_components/order-detail'
import { PriceBox } from '../cart/cart'
import { AddressBox, ClientRendering } from './client'
import TossPaymentsWidget from './tosspayments/toss-payment-widget'

function OrderDetails({ data }: { data: ProductCartProps[] }) {
    return (
        <section className="basis-3/5 w-full ">
            <h1 className="hidden lg:block text-2xl text-center pb-4">주문 요약</h1>
            <div className="space-y-1">
                {data.map((d) => (
                    <ProductHorizontalCard
                        {...d.product}
                        quantity={d.quantity}
                        size={d.size}
                        key={d.product.sku}
                    />
                ))}
            </div>
            <div className="h-3 border-b w-full my-2" />
            <PriceBox cartData={data} />
        </section>
    )
}

async function OrderOptions({ data }: { data: ProductCartProps[] }) {
    const session = (await auth()) as Session
    const addressArr = await getAddressAll(session.user.accessToken)

    return (
        <section className="basis-2/5 lg:mx-4">
            <h1 className="text-xl lg:text-2xl text-center pb-8 lg:pb-4">배송지 선택</h1>
            <PaymentProvider>
                <AddressBox data={addressArr} />
                <TossPaymentsWidget session={session.user} orderItems={data} />
            </PaymentProvider>
        </section>
    )
}

function OrderContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex flex-col lg:flex-row lg:gap-12 lg:justify-around w-full px-2 space-y-4 ">
            {children}
        </div>
    )
}

export default async function Order() {
    const cookieStore = cookies()
    const orderItems = cookieStore.get('pd_ck')

    if (!orderItems?.value)
        return redirect(
            '/order/fail?code=FAIL_TO_GET_CART_ITEMS&message=비정상적인 접근입니다.다시 시도해 주세요.',
        )

    const reqItems: ProductCartProps[] = JSON.parse(decodeURIComponent(atob(orderItems.value)))
    const result = await checkCartItems(reqItems)

    const availableItems = Object.entries(result).filter(([, status]) => status === true)
    if (availableItems.length === 0) throw new Error('No available Items')

    const cartData = reqItems.filter(({ size, product: { sku } }) =>
        availableItems.find(([form]) => form === `${sku}-${size}`),
    )
    const hasSoldOut = Object.keys(result).length !== cartData.length
    return (
        <>
            <OrderContainer>
                <OrderDetails data={cartData} />
                <Suspense fallback={<Spinner />}>
                    <OrderOptions data={cartData} />
                </Suspense>
            </OrderContainer>
            <ClientRendering hasSoldOut={hasSoldOut} availableItems={availableItems} />
        </>
    )
}
