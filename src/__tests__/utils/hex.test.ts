import { stringToHex, hexToString } from '@/utils/simple-hash'
import productMock from '@/__mocks__/product-data-api'

describe('Price Calculation', () => {
    const mockData = [
        { product: productMock[0], quantity: 1, size: '240', checked: true },
        { product: productMock[1], quantity: 2, size: '235', checked: true },
        { product: productMock[2], quantity: 3, size: '230', checked: true },
        { product: productMock[3], quantity: 3, size: '230', checked: false },
    ]
    const productCheck = mockData.map(({ size, product: { sku } }) => ({ sku, size }))

    it('should decode to string', () => {
        const encodedData = stringToHex(JSON.stringify(productCheck))
        const decodedData = hexToString(encodedData)
        const parsedProductCheck = JSON.parse(decodedData)

        expect(parsedProductCheck).toEqual(productCheck)
    })
})
