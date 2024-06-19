import useRecentView from '@/hooks/data/product-recent-view'
import EmblaCarousel, { CarouselImage } from '@/components/carousel/carousel'
import { Description } from '@/components/product'
import { ProductProps } from '@/hooks/data/type'
import styles from './components/carousel/styles.module.css'

function RecentViewProduct({ product }: { product: ProductProps }) {
    const src = `${process.env.NEXT_PUBLIC_CDN}/product/${product.sku}/main.webp`
    return (
        <div key={product.sku} className={`${styles.embla__slide} flex-center flex-col tex-sm`}>
            <CarouselImage
                src={src}
                alt="최신 본 제품"
                className="object-cover"
                width={300}
                height={300}
            />
            <Description product={product} />
        </div>
    )
}

export default function RecentView({ product }: { product: ProductProps }) {
    const recentView = useRecentView(product)

    if (!recentView) return null
    return (
        <div className="grow flex flex-col pt-10">
            <div className="text-xl pb-6 font-semibold">최근 본 아이템</div>
            <EmblaCarousel type="multi">
                {recentView.map((recentProduct: ProductProps) => (
                    <RecentViewProduct product={recentProduct} />
                ))}
            </EmblaCarousel>
        </div>
    )
}
