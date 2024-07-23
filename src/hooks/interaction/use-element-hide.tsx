import { useEffect, useRef } from 'react'

const useElementHide = (minHeight: number, maxHeight: number) => {
    const elementHideRef = useRef<HTMLDivElement>(null)
    const addStyle = ['opacity-100', 'h-auto', 'translate-y-0', 'relative', 'pt-4']
    const removeStyle = ['opacity-0', 'h-0', '-translate-y-4', 'absolute', 'pt-0']

    useEffect(() => {
        const onScroll = () => {
            if (elementHideRef.current) {
                const scroll = window.scrollY
                if (scroll < minHeight) {
                    elementHideRef.current.classList.remove(...removeStyle)
                    elementHideRef.current.classList.add(...addStyle)
                }
                if (scroll > maxHeight) {
                    elementHideRef.current.classList.add(...removeStyle)
                    elementHideRef.current.classList.remove(...addStyle)
                }
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [])

    return elementHideRef
}

export default useElementHide
