'use client'

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { ScrollDirectionProps } from '../utils/hooks/interaction/scroll-direction'

export const getNextPageNum = (scrollDirection: ScrollDirectionProps, currPage: string) =>
    scrollDirection && scrollDirection === 'up' ? currPage : String(Number(currPage) + 1)

const updatePageParams = (
    ref: React.RefObject<HTMLDivElement>,
    router: AppRouterInstance,
    scrollDirection: ScrollDirectionProps,
) => {
    const url = new URL(window.location.href)
    const { searchParams } = url

    // 현재 페이지 추출
    const currPage = ref.current && ref.current.getAttribute('data-page')
    const lastPage = ref.current && ref.current.getAttribute('data-last-page')

    if (currPage && lastPage && currPage < lastPage) {
        // 다음 페이지 추출 및 URL 업데이트
        const pageNum = getNextPageNum(scrollDirection, currPage)
        searchParams.set('page', pageNum)
        router.push(url.toString(), { scroll: false })
    }
}

export default updatePageParams
