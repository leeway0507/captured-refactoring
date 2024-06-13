import Image from 'next/image'
import Link from 'next/link'
import { ProductProps } from '../hooks/data/type'
import { KRW } from '../string-style/currency'

const handleImageError = (errorNode: React.SyntheticEvent<HTMLImageElement>) => {
    const targetElement = errorNode.target as HTMLElement
    const parentDiv = targetElement.parentNode as HTMLDivElement
    parentDiv!.className = 'hidden'
}

export function ProductImage({ sku, ImgName }: { sku: string; ImgName: string }) {
    const src = `${process.env.NEXT_PUBLIC_CDN}/product/${sku}/${ImgName}.webp`

    return (
        <div className="relative w-full aspect-[1/1.2] mx-auto bg-gray-50 vignette rounded">
            <Image
                src={src}
                alt={sku}
                fill
                className="object-cover"
                quality={95}
                priority
                unoptimized
                onError={handleImageError}
            />
        </div>
    )
}

export function Description({ product }: { product: ProductProps }) {
    const { brand, productName, price, productId, intl } = product
    const shotenProductName = productName.length > 25 ? `${productName.slice(0, 25)}...` : productName
    return (
        <div className="flex flex-col text-sub-black pt-1 px-1">
            <div className="h-[50px]">{`${brand} ${shotenProductName} | ${productId.toUpperCase()}`}</div>
            <div className="py-2 font-bold inline-block">
                {intl ? '해외배송' : '국내배송'} | {KRW(price)}
            </div>
        </div>
    )
}

export function ProductCard({ product }: { product: ProductProps }) {
    const { sku } = product

    return (
        <Link href={`/product/${sku}`} className="text-sub-black text-xs font-light pb-6 z-1 max-w-[300px]">
            <ProductImage sku={String(sku)} ImgName="main" />
            <Description product={product} />
        </Link>
    )
}
