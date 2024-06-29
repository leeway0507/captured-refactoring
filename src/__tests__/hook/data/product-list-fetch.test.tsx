import { convertObjToProductFilter } from '@/actions/product-list-fetch'

describe('product-list-fetch', () => {
    it('should convert URL Params to Product Filter Obj', async () => {
        // filter example
        const exampleArr = [{ brand: 'a,b', page: 'c' }]

        // result
        const filterObjArr = exampleArr.map((v) => convertObjToProductFilter(v))

        const resultArr = [{ pageNum: 'c', productFilter: '{"brand":"a,b"}' }]
        expect(filterObjArr).toEqual(resultArr)
    })
})
