import '@/__mocks__/useRouter-mock'
import { getFilterParams, updateFilterParams, userFilter } from '@/app/category/filter'
import { changeUrlMock } from '@/__mocks__/url-mock'
import { useRouter } from 'next/navigation'
import { renderHook } from '@testing-library/react'

describe('Filter Component Logic', () => {
    const filterObj = {
        brand: ['adidas', 'nike'],
        size: ['230', '235'],
    }
    const testUrl = 'http://localhost/?brand=adidas%2Cnike&size=230%2C235'

    it('should return filterObj', () => {
        const UrlObj = new URL(testUrl)
        changeUrlMock(UrlObj)

        const obj = getFilterParams()
        expect(obj).toEqual(filterObj)
    })

    it('should not return page Parms', () => {
        const URLwithPageParams = `${testUrl}&page=1`
        const UrlObj = new URL(URLwithPageParams)
        changeUrlMock(UrlObj)

        const obj = getFilterParams()
        expect(obj).toEqual(filterObj)
    })
    it('should update filter Params', () => {
        const router = useRouter()

        renderHook(() => updateFilterParams(filterObj, router))

        const updatedURLObj = new URL(window.location.href)
        expect(updatedURLObj.href).toBe(testUrl)
    })

    it('should get consistant filterParams Obj', () => {
        const { filterParams } = renderHook(() => userFilter())

        const updatedURLObj = new URL(window.location.href)
        expect(updatedURLObj.href).toBe(testUrl)
    })
})
