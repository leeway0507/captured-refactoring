
import { useEffect, useRef } from 'react'

const useElementHide = (minHeight: number, maxHeight: number) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const onScroll = () => {
            if (ref.current) {
                const scroll = window.scrollY
                if (scroll < minHeight) {
                    ref.current.classList.remove('opacity-0', 'h-0', '-translate-y-4', 'absolute')
                    ref.current.classList.add('opacity-100', 'h-auto', 'translate-y-0', 'relative')
                }
                if (scroll > maxHeight) {
                    ref.current.classList.add('opacity-0', 'h-0', '-translate-y-4', 'absolute')
                    ref.current.classList.remove(
                        'opacity-100',
                        'h-auto',
                        'translate-y-0',
                        'relative',
                    )
                }
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [])

    return ref
}

export default useElementHide
