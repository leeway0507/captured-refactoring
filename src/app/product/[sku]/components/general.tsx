import Link from 'next/link'

import { useState } from 'react'
import { ProductProps } from '@/app/utils/hooks/data/type'
import { ProductImage } from '@/app/utils/ui/product'
import { ToggleButton, ToggleButtonGrid, ConfirmButton } from '@/app/utils/ui/button'
import { KRW } from '@/app/utils/string-style/currency'
import ShipmentForm from '@/app/static/shipment-form'
import SideBar from '@/app/utils/ui/sidebar'
import useCart from '@/app/utils/hooks/data/product-cart'
import DeliveryInfo from './delivery-info'

export function Container({ children }: { children: React.ReactNode }) {
    return <div className="main-frame">{children}</div>
}

export function ImageLayout({ children }: { children: React.ReactNode }) {
    const ImageGrid = 'grid lg:grid-cols-2 overflow-auto w-full max-w-3xl gap-1 pt-6'
    return <div className={`${ImageGrid}`}>{children}</div>
}

export function ImageArr({ product }: { product: ProductProps }) {
    const imageNameArray = ['main', 'sub-1', 'sub-2', 'sub-3', 'sub-4']
    const sku = product.sku.toString()
    return imageNameArray.map((name) => <ProductImage sku={sku} ImgName={name} />)
}

export function ProductLayout({ children }: { children: React.ReactNode }) {
    const ProductFlex = 'flex flex-col py-8 sticky top-[60px] gap-8 tb:w-[380px] xl:w-[480px]'
    return <div className={`${ProductFlex}`}>{children}</div>
}

export function ProductInfo({ product }: { product: ProductProps }) {
    const { brand, productName, price, intl, productId } = product

    return (
        <div className="flex flex-col text-main-black tracking-tidest gap-1">
            <Link href={`/category/brand/${brand}`} className="uppercase lg:text-sm text-zinc-400 underline">
                {brand}
            </Link>

            <div className="flex items-left justify-between lg:text-xl capitalize font-bold">{productName}</div>
            <div className="flex-left justify-between gap-2 text ">{productId.toUpperCase()}</div>

            <div className="whitespace-nowrap relative pt-3 pb-6 text-base">
                <div>{KRW(price)} </div>
                <div className="text-xs mx-2 text-blue-black">{intl && '관·부가세 포함'}</div>
            </div>
            <hr />
        </div>
    )
}

interface SizeStatusProps {
    size: string
    status: 'selected' | 'init'
}

export const getSizeStatus = (sizeList: string[], selectedItem: string | undefined): SizeStatusProps[] => {
    const getStatus = (size: string, selected: string | undefined) => (size === selected ? 'selected' : 'init')
    return sizeList.map((s) => ({ size: s, status: getStatus(s, selectedItem) }))
}

export function AddToCart({ product, selectedSize }: { product: ProductProps; selectedSize: string }) {
    const { size } = product
    const isSoldOut = !!(size && size.length > 0)
    const status = isSoldOut ? '장바구니 담기' : '품절'

    const { addToCart } = useCart()

    const handleClick = () => {
        addToCart(product, selectedSize)
    }

    return (
        <ConfirmButton buttonSize="xl" disabled={isSoldOut} onClick={handleClick}>
            {status}
        </ConfirmButton>
    )
}

export function SizeBox({ product }: { product: ProductProps }) {
    const [selected, setSelected] = useState<string>()
    const sizeStatusList = getSizeStatus(product.size, selected)
    return (
        <>
            <ToggleButtonGrid>
                {sizeStatusList.map((d) => (
                    <ToggleButton data={d.size} status={d.status} setSelected={setSelected} />
                ))}
            </ToggleButtonGrid>
            <AddToCart product={product} selectedSize={selected!} />
        </>
    )
}

export function Shipment({ product }: { product: ProductProps }) {
    const { intl } = product
    return <ShipmentForm type={intl ? 'intl' : 'dome'} />
}
export function Info() {
    const [isDeliveryOpen, setIsDeliveryOpen] = useState(false)
    const closeDeliveryModal = () => setIsDeliveryOpen(false)

    return (
        <>
            <button
                type="button"
                onClick={() => setIsDeliveryOpen(true)}
                className="text-main-black ps-1 pe-4 flex justify-between w-full text-xl font-bold link-animation"
            >
                <span>배송 및 반품 안내 ❯</span>
            </button>
            <SideBar
                content={<DeliveryInfo closeModal={closeDeliveryModal} />}
                isOpen={isDeliveryOpen}
                closeModal={closeDeliveryModal}
            />
        </>
    )
}
