import Image from 'next/image'
import Link from 'next/link'
import cn from '@/utils/cn'
import { KRW } from '@/utils/currency'
import { ProductProps } from '@/hooks/data/type'

const handleImageError = (errorNode: React.SyntheticEvent<HTMLImageElement>) => {
    const targetElement = errorNode.target as HTMLElement
    const parentDiv = targetElement.parentNode as HTMLDivElement
    parentDiv!.className = 'hidden'
}

export function ProductImage({
    sku,
    imgName,
    className,
}: {
    sku: string
    imgName: string
    className?: string
}) {
    const src = `${process.env.NEXT_PUBLIC_CDN}/product/${sku}/${imgName}.webp`
    const defaultOptions = 'bg-gray-50 relative w-full aspect-[1/1.2] mx-auto vignette rounded'

    return (
        <div className={cn(defaultOptions, className)}>
            <Image
                src={src}
                alt="상품이미지"
                fill
                className="object-cover"
                unoptimized
                onError={handleImageError}
            />
        </div>
    )
}

export function Description({ product }: { product: ProductProps }) {
    const { brand, productName, price, productId, intl } = product
    const shotenProductName =
        productName.length > 50 ? `${productName.slice(0, 50)}...` : productName
    return (
        <div className="flex-col flex-center text-sub-black px-2 w-full text-center font-medium">
            <div className="capitalize py-1 ">{`${brand} | ${productId}`}</div>
            <div className="text-gray-500">{`${shotenProductName}`}</div>
            <div className="py-2">
                {intl ? '해외배송' : '국내배송'} | {KRW(price)}
            </div>
        </div>
    )
}

export function ProductCard({ product }: { product: ProductProps }) {
    const { sku } = product

    return (
        <Link href={`/product/${sku}`} className="text-sub-black text-xs font-light z-1 ">
            <ProductImage sku={String(sku)} imgName="main" />
            <Description product={product} />
        </Link>
    )
}
