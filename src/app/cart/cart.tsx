'use client'

import useCart, { ProductCartProps } from '../utils/hooks/data/product-cart'
import { ProductImage } from '../utils/ui/product'

function NoCartData() {
    return <div />
}

function ProductDescription({ data }: { data: ProductCartProps }) {
    const { increaseQty, decreaseQty, removeToCart } = useCart()
    return <div className="flex flex-col">qty:{data.qty}</div>
}

function ProductCartCard({ data }: { data: ProductCartProps }) {
    return (
        <div className="flex justify-between">
            <ProductImage sku={String(data.product.sku)} imgName="main" />
            <ProductDescription data={data} />
        </div>
    )
}

function Cart() {
    const { cartData } = useCart()

    console.log(cartData)

    if (!cartData) return <NoCartData />
    return cartData.map((d) => <ProductCartCard data={d} />)
}

export default Cart
