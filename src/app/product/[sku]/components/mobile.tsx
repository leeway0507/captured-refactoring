import { ProductProps } from '@/app/utils/hooks/data/type'
import { KRW } from '@/app/utils/string-style/currency'
import EmblaCarousel, { CarouselImage } from '@/app/utils/ui/carousel/carousel'
import { AddToCartButton, RecentView } from './general'

export function Container({ children }: { children: React.ReactNode }) {
    return <div className="main-frame">{children}</div>
}

export function SlideImage({ product }: { product: ProductProps }) {
    const imageNameArray = ['main', 'sub-1', 'sub-2', 'sub-3', 'sub-4']
    return (
        <EmblaCarousel type="single">
            {imageNameArray.map((name) => (
                <CarouselImage
                    key={name}
                    src={`${process.env.NEXT_PUBLIC_CDN}/product/${product.sku}/${name}.webp`}
                    width={400}
                    height={400}
                    alt={name}
                />
            ))}
        </EmblaCarousel>
    )
}

export function ButtonBox({ product, selected }: { product: ProductProps; selected: string }) {
    const container =
        'h-[60px] bg-white fixed bottom-0 left-0 px-4 flex gap-4 w-full border-t-2 items-center justify-between z-10'
    return (
        <div className={`${container}`}>
            <div>{KRW(product.price)}</div>
            <AddToCartButton product={product} selected={selected} />
        </div>
    )
}

export function RecentViewM({ product }: { product: ProductProps }) {
    return (
        <div className="pb-[60px]">
            <RecentView product={product} />
        </div>
    )
}
