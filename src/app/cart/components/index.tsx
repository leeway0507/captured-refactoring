'use client'

import Link from 'next/link'
import { toast } from 'react-toastify'
import { Plus, Minus, Trash2 } from 'lucide-react'

import { ProductCartProps, ProductProps } from '@/types'
import useCart from '@/hooks/data/use-cart'
import { KRW } from '@/utils/currency'
import { setCartItemsToCookies } from '@/actions/cart'
import { Button } from '@/components/shadcn-ui/button'
import { ConfirmButton } from '@/components/button'
import { ProductImage } from '@/components/product/product-card'
import Spinner from '@/components/spinner/spinner'
import { PriceBox } from '@/components/order/price-box'

import { CartShipmentInfo } from './shipment-info'
import { NoCartData } from './no-cart-data'

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
            <div>{quantity}</div>
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
        <div className="flex flex-col w-full justify-center  md: ">
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

function CartProductBox({
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
        <div className="flex flex-col md:flex-row md:gap-2 lg:gap-12 md:justify-around w-full page-max-frame mx-auto">
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
            <CartProductBox
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
