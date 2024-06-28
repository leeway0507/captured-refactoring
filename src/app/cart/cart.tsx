'use client'

import Link from 'next/link'
import { Plus, Minus, Trash2, ChevronRight, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/shadcn-ui/button'
import { ConfirmButton } from '@/components/button'
import useCart from '@/hooks/data/product-cart'
import { ProductCartProps, ProductProps } from '@/hooks/data/type'
import { ProductImage } from '@/components/product-card'
import { KRW } from '@/utils/currency'
import Spinner from '@/components/spinner/spinner'
import { toast } from 'react-toastify'
import calcTotalPrice from './calculate-price'
import { CartShipmentInfo } from './_components/shipment-info'
import { setCartItemsToCookies } from './action'

function NoCartData() {
    return (
        <div className="grow flex-center flex-col h-[60vh] text-2xl">
            <p>장바구니가 비었습니다.</p>
            <Link className="text-gray-400 pt-5" href="/shop">
                구매하러 가기
            </Link>
        </div>
    )
}

function ProductQtyUpdate({
    quantity,
    increaseQty,
    decreaseQty,
}: {
    quantity: number
    increaseQty: () => void
    decreaseQty: () => void
}) {
    return (
        <div className="flex gap-2 items-center">
            <Button
                size="icon-sm"
                variant="ghost"
                type="button"
                onClick={decreaseQty}
                aria-label="Decrease quantity"
            >
                <Minus size="12px" strokeWidth="3" />
            </Button>
            <div className="text-sm">{quantity}</div>
            <Button
                size="icon-sm"
                variant="ghost"
                type="button"
                onClick={increaseQty}
                aria-label="Decrease quantity"
            >
                <Plus size="12px" strokeWidth="3" />
            </Button>
        </div>
    )
}

function ProductDescription({
    data,
    increaseQty,
    decreaseQty,
    removeToCart,
}: {
    data: ProductCartProps
    increaseQty: (product: ProductProps, size: string) => void
    decreaseQty: (product: ProductProps, size: string) => void
    removeToCart: (product: ProductProps, size: string) => void
}) {
    const { product, size } = data
    const handleRemoveProduct = () => {
        toast('장바구니에서 제거되었습니다.')
        removeToCart(product, size)
    }

    return (
        <div className="flex flex-col w-full justify-center text-xs md:text-sm ">
            <div className="flex justify-between items-center">
                <span className="text-base md:text-lg">{product.brand}</span>
                <Button variant="ghost" size="icon-sm" onClick={handleRemoveProduct}>
                    <Trash2 size="20px" />
                </Button>
            </div>
            <span className="text-gray-500 line-clamp-1">{product.productName}</span>
            <span className="uppercase text-gray-500">{product.productId}</span>
            <div className="flex justify-between">
                <span>{size}</span>
                <span className=" underline text-gray-500">
                    {product.intl ? '해외배송' : '국내배송'}
                </span>
            </div>
            <div className="flex justify-between pt-2">
                <ProductQtyUpdate
                    quantity={data.quantity}
                    increaseQty={() => increaseQty(data.product, data.size)}
                    decreaseQty={() => decreaseQty(data.product, data.size)}
                />
                <span>{KRW(product.price)}</span>
            </div>
        </div>
    )
}

function ProductBox({
    cartData,
    increaseQty,
    decreaseQty,
    removeToCart,
    toggleCheckState,
}: {
    cartData: ProductCartProps[]
    increaseQty: (product: ProductProps, size: string) => void
    decreaseQty: (product: ProductProps, size: string) => void
    removeToCart: (product: ProductProps, size: string) => void
    toggleCheckState: (product: ProductProps, size: string) => void
}) {
    return (
        <section className="basis-3/5">
            {cartData.map((data) => (
                <div
                    key={String(data.product.sku)}
                    className="flex-center gap-3 border-b py-2 px-2"
                >
                    <input
                        type="checkbox"
                        className="accent-black md:scale-[115%] w-4 md:mx-2"
                        id={`${data.product.sku}-${data.size}`}
                        defaultChecked={data.checked}
                        onClick={() => toggleCheckState(data.product, data.size)}
                    />
                    <Link
                        className="flex-center flex-col w-full  max-w-[100px] md:max-w-[125px] lg:max-w-[150px]"
                        href={`/product/${data.product.sku}`}
                    >
                        <ProductImage
                            sku={String(data.product.sku)}
                            imgName="main"
                            className="aspect-[1/1]"
                        />
                    </Link>
                    <ProductDescription
                        data={data}
                        removeToCart={removeToCart}
                        increaseQty={() => increaseQty(data.product, data.size)}
                        decreaseQty={() => decreaseQty(data.product, data.size)}
                    />
                </div>
            ))}
        </section>
    )
}

function ShippingBox({
    intlShippingFee,
    domeShippingFee,
}: {
    intlShippingFee: number
    domeShippingFee: number
}) {
    const totalShippingFee = intlShippingFee + domeShippingFee
    const [isOpen, setIsOpen] = useState(false)
    const handleToggle = () => setIsOpen((old) => !old)
    const chevron = isOpen ? (
        <ChevronDown size="16px" strokeWidth="3" />
    ) : (
        <ChevronRight size="16px" strokeWidth="3" />
    )
    return (
        <>
            <button type="button" onClick={handleToggle} className="flex justify-between w-full">
                <div className="flex-center gap-2">
                    <span>총 배송비 </span>
                    <span>{chevron}</span>
                </div>
                <span> {KRW(totalShippingFee)}</span>
            </button>{' '}
            <div className={`${isOpen ? 'block' : 'hidden '} text-xs text-gray-500`}>
                <div className="flex justify-between w-full">
                    <span>국내 배송비</span>
                    <span>{KRW(intlShippingFee)}</span>
                </div>
                <div className=" flex justify-between w-full">
                    <span>해외 배송비</span>
                    <span>{KRW(domeShippingFee)}</span>
                </div>
            </div>
        </>
    )
}

export function PriceBox({ cartData }: { cartData: ProductCartProps[] }) {
    const { totalProductPrice, intlShippingFee, domeShippingFee } = calcTotalPrice(cartData)
    const totalShippingFee = intlShippingFee + domeShippingFee
    const totalPrice = totalProductPrice + totalShippingFee

    return (
        <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between ">
                <div>물품가격</div>
                <div>{KRW(totalProductPrice)}</div>
            </div>
            <ShippingBox intlShippingFee={intlShippingFee} domeShippingFee={domeShippingFee} />
            <div className="flex justify-between text-base">
                <div>총 결제금액</div>
                <div>{KRW(totalPrice)}</div>
            </div>
        </div>
    )
}

function OrderButton({ cartData }: { cartData: ProductCartProps[] }) {
    const handleClick = () =>
        setCartItemsToCookies(window.btoa(encodeURIComponent(JSON.stringify(cartData))))
    return (
        <div className="w-full flex gap-4 justify-evenly">
            <ConfirmButton className="w-full" onClick={handleClick}>
                주문하기
            </ConfirmButton>
        </div>
    )
}
function InfoBox({ cartData }: { cartData: ProductCartProps[] }) {
    const checkedCartData = cartData.filter((p) => p.checked)
    return (
        <aside className="flex flex-col w-full md:max-w-[350px] lg:max-w-[450px] gap-6 bg-gray-50 md:bg-white p-4 shadow-inner md:shadow-none">
            <PriceBox cartData={checkedCartData} />
            <OrderButton cartData={checkedCartData} />
            <CartShipmentInfo />
        </aside>
    )
}

function CartContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col md:flex-row md:gap-2 lg:gap-12 md:justify-around w-full">
            {children}
        </div>
    )
}

function Cart() {
    const { cartData, increaseQty, decreaseQty, removeToCart, toggleCheckState } = useCart()

    if (!cartData) return <Spinner />
    if (cartData.length === 0) return <NoCartData />
    return (
        <CartContainer>
            <ProductBox
                cartData={cartData}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                removeToCart={removeToCart}
                toggleCheckState={toggleCheckState}
            />
            <InfoBox cartData={cartData} />
        </CartContainer>
    )
}

export default Cart
