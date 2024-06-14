'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import styles from './styles.module.css'

type EmblaCarouselProps = {
    children: React.ReactNode
}

const handleImageError = (errorNode: React.SyntheticEvent<HTMLImageElement>) => {
    const targetElement = errorNode.target as HTMLElement
    const parentDiv = targetElement.parentNode as HTMLDivElement
    parentDiv.className = 'w-0'
}

interface CarouselImageProps extends React.ComponentProps<typeof Image> {}

export function CarouselImage(props: CarouselImageProps) {
    return (
        <div className={styles.embla__slide}>
            <Image
                unoptimized
                className={`${styles.embla__slide__img} bg-gray-100`}
                onError={handleImageError}
                priority
                {...props}
            />
        </div>
    )
}

function EmblaCarousel({ children }: EmblaCarouselProps) {
    const [emblaRef] = useEmblaCarousel()

    return (
        <div className="flex flex-col">
            <div className={styles.embla}>
                <div className={styles.embla__viewport} ref={emblaRef}>
                    <div className={styles.embla__container}>{children}</div>
                </div>
            </div>
        </div>
    )
}

export default EmblaCarousel
