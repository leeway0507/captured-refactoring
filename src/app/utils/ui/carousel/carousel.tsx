'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import styles from './styles.module.css'

type EmblaCarouselProps = {
    children: React.ReactNode
    type: 'single' | 'multi'
}

const handleImageError = (errorNode: React.SyntheticEvent<HTMLImageElement>) => {
    const targetElement = errorNode.target as HTMLElement
    const parentDiv = targetElement.parentNode as HTMLDivElement
    parentDiv.className = 'w-0'
}

interface CarouselImageProps extends React.ComponentProps<typeof Image> {}

export function CarouselImage(props: CarouselImageProps) {
    const { className } = props
    return (
        <div className={styles.embla__slide}>
            <Image
                unoptimized
                className={`${styles.embla__slide__img} bg-gray-100 ${className}`}
                onError={handleImageError}
                priority
                {...props}
            />
        </div>
    )
}

function EmblaCarousel({ children, type }: EmblaCarouselProps) {
    const [emblaRef] = useEmblaCarousel()

    const carouselType = {
        single: styles.embla,
        multi: styles.embla_multi,
    }

    return (
        <div className="flex flex-col">
            <div className={carouselType[type]}>
                <div className={styles.embla__viewport} ref={emblaRef}>
                    <div className={styles.embla__container}>{children}</div>
                </div>
            </div>
        </div>
    )
}

export default EmblaCarousel
