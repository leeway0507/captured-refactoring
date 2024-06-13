import '@/__mocks__/intersectionObserver-mock'
import { changeUrlMock } from '@/__mocks__/url-mock';
import updatePageParams, { getNextPageNum } from "@/app/category/product-infinite-scroll";
import useIntersectionObserver from '@/app/hook/interaction/infinite-scroll';
import { renderHook, render } from "@testing-library/react";
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
    __esModule: true,
    useRouter: () => ({
        push: jest.fn((s) => {
            const url = new URL(s, window.location.origin);
            changeUrlMock(url)
        }),
    }),
}));

jest.mock('../../app/components/interaction/scroll-direction', () => ({
    __esModule: true,
    default: jest.fn().mockReturnValue('down'),
}));

describe('product-infinite-scroll', () => {
    const expectedResult = "page=2";
    const initialURL = new URL(window.location.href)

    let refMock: any
    beforeEach(() => {
        changeUrlMock(initialURL)
        refMock = {
            current: {
                getAttribute: jest.fn(attributeName => {
                    if (attributeName === 'data-page') {
                        return '1';
                    } if (attributeName === 'data-last-page') {
                        return '5';
                    }
                    return undefined
                }),
            },
        };
    })


    it('should return a PageNum depending on the Scroll Direction', () => {
        const currPage = '1'
        const scrollUp = 'up'
        const scrollDown = 'down'

        const upPageNum = getNextPageNum(scrollUp, currPage)
        const downPageNum = getNextPageNum(scrollDown, currPage)

        expect(upPageNum).toBe('1')
        expect(downPageNum).toBe('2')
    });


    it('should check if URL is pushed', () => {
        const router = useRouter()
        const scrollDown = 'down'

        renderHook(() => updatePageParams(refMock, router, scrollDown));

        const updatedURLObj = new URL(window.location.href);
        expect(updatedURLObj.searchParams.toString()).toBe(expectedResult);
    });


    it('should work interSectionTrigger', () => {
        function TestIntersection() {
            const ref = useIntersectionObserver(updatePageParams)
            return <div ref={ref} data-page='1' data-last-page='3' />
        }

        render(<TestIntersection />)

        const updatedURL = new URL(window.location.href);
        expect(updatedURL.searchParams.toString()).toBe(expectedResult);
    });
});
