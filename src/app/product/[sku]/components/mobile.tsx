import { ProductProps } from '@/app/utils/hooks/data/type'
import { KRW } from '@/app/utils/string-style/currency'
import CarouselProgressBar, { CarouselImage } from '@/app/utils/ui/carousel/carousel'
import { AddToCart } from './general'

export function Container({ children }: { children: React.ReactNode }) {
    return <div className="main-frame">{children}</div>
}

export function CarouselImageArr({ product }: { product: ProductProps }) {
    const imageNameArray = ['main', 'sub-1', 'sub-2', 'sub-3', 'sub-4']
    return imageNameArray.map((name) => (
        <CarouselImage
            src={`${process.env.NEXT_PUBLIC_CDN}/product/${product.sku}/${name}.webp`}
            width={400}
            height={400}
            alt={name}
        />
    ))
}

export function SlideImage({ product }: { product: ProductProps }) {
    return (
        <CarouselProgressBar>
            <CarouselImageArr product={product} />
        </CarouselProgressBar>
    )
}

export function CartBox({ product, selected }: { product: ProductProps; selected: string }) {
    const container =
        'h-[60px] bg-white fixed left-0 px-4 bottom-0 flex gap-4 w-full  border-t-2 items-center justify-between z-10'
    return (
        <div className={`${container}`}>
            <div>{KRW(product.price)}</div>
            <AddToCart product={product} selected={selected} />
        </div>
    )
}
