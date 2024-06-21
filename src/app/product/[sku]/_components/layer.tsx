import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import { KRW } from '@/utils/currency'
import useCart from '@/hooks/data/product-cart'
import useRecentView from '@/hooks/data/product-recent-view'
import { ProductProps } from '@/hooks/data/type'
import SideModal from '@/components/side-modal'
import { ProductImage, ProductCard } from '@/components/product-card'
import EmblaCarousel, { CarouselImage } from '@/components/carousel/carousel'
import { ToggleButton, ButtonBox, ConfirmButton, getToggleStatus } from '@/components/button'
import styles from '@/components/carousel/styles.module.css'
import { ProductShipmentInfo, ProductShipmentInfoModal } from './shipment-info'

export function Container({ children }: { children: React.ReactNode }) {
    return <div className="flex gap-8 justify-between flex-col md:flex-row ">{children}</div>
}

export function ImageNormal({ product }: { product: ProductProps }) {
    const imageNameArray = ['main', 'sub-1', 'sub-2', 'sub-3']
    const ImageGrid = 'hidden md:grid lg:grid-cols-2 overflow-auto w-full max-w-3xl gap-1 pt-6'
    const sku = product.sku.toString()
    return (
        <div className={`${ImageGrid}`}>
            {imageNameArray.map((name) => (
                <ProductImage key={name} sku={sku} imgName={name} />
            ))}
        </div>
    )
}

export function ImageMobile({ product }: { product: ProductProps }) {
    const imageNameArray = ['main', 'sub-1', 'sub-2', 'sub-3']
    return (
        <EmblaCarousel type="single">
            {imageNameArray.map((name) => (
                <CarouselImage
                    key={name}
                    src={`${process.env.NEXT_PUBLIC_CDN}/product/${product.sku}/${name}.webp`}
                    width={400}
                    height={400}
                    alt="상품이미지"
                />
            ))}
        </EmblaCarousel>
    )
}

export function ImageLayer({ product }: { product: ProductProps }) {
    return (
        <>
            <ImageNormal product={product} />
            <div className="block md:hidden">
                <ImageMobile product={product} />
            </div>
        </>
    )
}

export function InfoLayout({ children }: { children: React.ReactNode }) {
    const InfoClass =
        'flex flex-col w-full gap-4 md:gap-8 lg:max-w-[380px] xl:max-w-[480px] px-2 md:py-8'

    return <aside className={`${InfoClass}`}>{children}</aside>
}

export function ProductInfo({ product }: { product: ProductProps }) {
    const { brand, productName, price, intl, productId } = product

    return (
        <div className="flex flex-col text-main-black tracking-tidest gap-1">
            <Link
                href={`/shop/?brand=${brand}`}
                className="uppercase lg:text-sm text-zinc-400 underline"
            >
                {brand}
            </Link>

            <div className="flex items-left justify-between lg:text-xl capitalize font-semibold">
                {productName}
            </div>
            <div className="flex-left justify-between gap-2 text ">{productId.toUpperCase()}</div>

            <div className="whitespace-nowrap relative py-3">
                <div>{KRW(price)} </div>
                <div className="text-xs mx-2 text-blue-black">{intl && '관·부가세 포함'}</div>
            </div>
            <hr />
        </div>
    )
}

export function SizeBox({
    product,
    selected,
    setSelected,
}: {
    product: ProductProps
    selected: string | undefined
    setSelected: (s: string) => void
}) {
    const sizeStatusList = getToggleStatus(product.size, selected)
    return (
        <ButtonBox>
            {sizeStatusList.map((d) => (
                <ToggleButton
                    key={d.item}
                    data={d.item}
                    status={d.status}
                    setSelected={setSelected}
                />
            ))}
        </ButtonBox>
    )
}

export function AddToCartNormal({
    product,
    selected,
}: {
    product: ProductProps
    selected: string
}) {
    const { size } = product
    const inStock = !!(size && size.length > 0)

    const { addToCart } = useCart()

    const handleClick = () => {
        addToCart(product, selected)
        // TODO: toast 추가
    }

    return (
        <ConfirmButton disabled={!inStock || !selected} onClick={handleClick} className="w-full">
            {inStock ? '장바구니 담기' : '품절'}
        </ConfirmButton>
    )
}

export function AddToCartMobile({
    product,
    selected,
}: {
    product: ProductProps
    selected: string
}) {
    const boxContainer =
        'flex items-center justify-between h-[70px] bg-white fixed bottom-0 left-0 px-4 w-full border-t-2 z-10'
    return (
        <div className={`${boxContainer}`}>
            <div className="basis-2/3 grow">{KRW(product.price)}</div>
            <AddToCartNormal product={product} selected={selected} />
        </div>
    )
}

export function AddToCart({ product, selected }: { product: ProductProps; selected: string }) {
    return (
        <>
            <div className="hidden md:block">
                <AddToCartNormal product={product} selected={selected} />
            </div>
            <div className="block md:hidden">
                <AddToCartMobile product={product} selected={selected} />
            </div>
        </>
    )
}

export function Shipment({ product }: { product: ProductProps }) {
    const { intl } = product
    return <ProductShipmentInfo type={intl ? 'intl' : 'dome'} />
}
export function Info() {
    const [isDeliveryOpen, setIsDeliveryOpen] = useState(false)
    const closeDeliveryModal = () => setIsDeliveryOpen(false)

    const hadnleClick = () => setIsDeliveryOpen(true)

    return (
        <>
            <button
                type="button"
                onClick={hadnleClick}
                className="ps-1 pe-4 flex items-center w-full text-xl font-semibold"
            >
                <span>배송 및 반품 안내</span>
                <span>
                    <ChevronRight strokeWidth="3" />
                </span>
            </button>
            <SideModal isOpen={isDeliveryOpen} closeModal={closeDeliveryModal}>
                <ProductShipmentInfoModal closeModal={closeDeliveryModal} />
            </SideModal>
        </>
    )
}

function RecentViewProduct({ recentView }: { recentView: ProductProps[] }) {
    return (
        <EmblaCarousel type="multi">
            {recentView.map((product: ProductProps) => (
                <div key={product.sku} className={`${styles.embla__slide} flex-center`}>
                    <ProductCard product={product} />
                </div>
            ))}
        </EmblaCarousel>
    )
}

export function RecentView({ product }: { product: ProductProps }) {
    const recentView = useRecentView(product)

    if (!recentView) return null
    return (
        <div className="grow flex flex-col pt-10">
            <div className="text-xl pb-6 font-semibold">최근 본 아이템</div>
            <RecentViewProduct recentView={recentView} />
        </div>
    )
}