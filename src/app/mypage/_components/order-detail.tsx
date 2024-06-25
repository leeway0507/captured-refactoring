'use client'

import { useEffect, useState } from 'react'
import { KRW } from '@/utils/currency'
import { getOrderRow } from '@/hooks/data/order-fetch'
import { getAddressById } from '@/hooks/data/address-fetch'
import { AddressProps, OrderInfoProps, OrderProductProps, ProductProps } from '@/hooks/data/type'
import { ProductCartProps } from '@/hooks/data/product-cart'
import { ProductImage } from '@/components/product-card'
import Spinner from '@/components/spinner/spinner'
import { ConfirmButton } from '@/components/button'
import { useRouter } from 'next/navigation'
import { ItemGroup, ItemRow } from '@/components/item'
import { ChevronLeft } from 'lucide-react'
import { PriceBox } from '../../cart/cart'
import { AddressInfo } from './address'

function OrderProductDescription({ orderProducts }: { orderProducts: OrderProductProps }) {
    const { brand, productName, price, productId, intl, size, quantity } = orderProducts
    return (
        <div className="flex flex-col w-full justify-center text-xs md:text-sm ">
            <span className="text-base md:text-lg">{brand}</span>
            <span className="text-gray-500 line-clamp-1">{productName}</span>
            <span className="uppercase text-gray-500">{productId}</span>
            <div className="flex justify-between">
                <span>{size}</span>
                <span className="underline text-gray-500">{intl ? '해외배송' : '국내배송'}</span>
            </div>
            <div className="flex justify-between pt-2">
                <span>{`수량 : ${quantity}`}</span>
                <span>{KRW(price)}</span>
            </div>
        </div>
    )
}

function OrderProductCard({ orderProducts }: { orderProducts: OrderProductProps }) {
    return (
        <div className="flex gap-4">
            <ProductImage
                sku={orderProducts.sku.toString()}
                imgName="main"
                className="max-w-[150px]"
            />
            <OrderProductDescription orderProducts={orderProducts} />
        </div>
    )
}

function OrderProductInfo({ orderProducts }: { orderProducts: OrderProductProps[] }) {
    return orderProducts.map((p) => <OrderProductCard key={p.sku} orderProducts={p} />)
}

function OrderTitle({ children }: { children: React.ReactNode }) {
    return <h1 className="text-lg md:text-xl border-b  pb-1 mb-2">{children}</h1>
}

const productCartAdapter = (orderProducts: OrderProductProps[]): ProductCartProps[] =>
    orderProducts.map((p) => {
        const { size, quantity, ...rest } = p
        // 주의: 타입 강제 변경하였음
        return {
            product: rest as unknown as ProductProps,
            size,
            qty: quantity,
            checked: true,
        }
    })

function OrderInfo({ order }: { order: OrderInfoProps }) {
    const container = 'grid grid-rows-4 w-full grid-flow-col auto-cols-auto'
    return (
        <ItemGroup className={`${container}`}>
            <ItemRow name="주문정보" value={order.userOrderNumber} />
            <ItemRow name="결제방식" value={order.paymentMethod} />
            <ItemRow name="결제상태" value={order.paymentStatus} />
            <ItemRow name="결제금액" value={KRW(order.orderTotalPrice)} />
            <ItemRow name="주문상태" value={order.orderStatus} />
            <ItemRow name="결제일" value={order.orderedAt.replace('T', ' ')} />
            <ItemRow name="결제코드" value={order.orderId} />
        </ItemGroup>
    )
}

export default function OrderDetail({
    order,
    accessToken,
}: {
    order: OrderInfoProps
    accessToken: string
}) {
    const [orderProducts, setOrderProducts] = useState<OrderProductProps[]>([])
    const [address, setAddress] = useState<AddressProps>()
    const router = useRouter()

    useEffect(() => {
        const getProducts = async () =>
            getOrderRow(order.orderId, accessToken)
                .then((r) => setOrderProducts(r.data))
                .catch(() => setOrderProducts([]))

        const getaddressInfo = async () =>
            getAddressById(order.addressId, accessToken)
                .then((r) => setAddress(r.data))
                .catch(() => setAddress(undefined))

        getaddressInfo()
        getProducts()
    }, [])

    const handleOnClick = () => {
        const url = new URL(window.location.href)
        url.searchParams.delete('orderId')
        router.push(url.href)
    }

    if (orderProducts.length === 0 && !address) return <Spinner />

    return (
        <div className="space-y-8 text-sm max-w-xl mx-auto">
            <ChevronLeft onClick={handleOnClick} className="cursor-pointer" />
            <section>
                <OrderTitle>주문상태</OrderTitle>
                <OrderInfo order={order} />
            </section>
            <section>
                <OrderTitle>배송정보</OrderTitle>
                <AddressInfo address={address} />
            </section>
            <section>
                <OrderTitle>상세주문정보</OrderTitle>
                <OrderProductInfo orderProducts={orderProducts} />
                <div className="border-b h-2 my-2" />
                <PriceBox cartData={productCartAdapter(orderProducts)} />
            </section>
            <ConfirmButton onClick={handleOnClick} className="w-full">
                돌아가기
            </ConfirmButton>
        </div>
    )
}
