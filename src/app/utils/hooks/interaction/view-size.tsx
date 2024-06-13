'use client'

import { useState, useEffect } from 'react'

type View = 'mobile' | 'general' | undefined
const mobileSize = 768

const detectView = (innerWidth: number) => (innerWidth < mobileSize ? 'mobile' : 'general')

const useMobile = () => {
    const [view, setView] = useState<View>()

    // 초기 체크
    useEffect(() => {
        setView(detectView(window.innerWidth))
    }, [])

    // 사이즈 변화 체크(반응형)
    useEffect(() => {
        const handleResize = () => {
            const newView = detectView(window.innerWidth)
            if (view !== newView) setView(newView)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [view])

    return view
}

export default useMobile
