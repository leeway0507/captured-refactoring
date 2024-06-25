import calcTotalPrice, {
    calculateProductPrice,
    calculateDomeShippingFee,
    calculateIntlShippingFee,
} from '@/app/cart/calculate-price'

import productMock from '@/__mocks__/product-data-api'

describe('Price Calculation', () => {
    const mockData = [
        { product: productMock[0], qty: 1, size: '240', checked: true },
        { product: productMock[1], qty: 2, size: '235', checked: true },
        { product: productMock[2], qty: 3, size: '230', checked: true },
        { product: productMock[3], qty: 3, size: '230', checked: false },
    ]

    // calc only checked
    const expectedProductPrice =
        mockData[0].product.price * mockData[0].qty +
        mockData[1].product.price * mockData[1].qty +
        mockData[2].product.price * mockData[2].qty

    // calc only checked
    const expectedIntlFeeResult =
        mockData[0].product.shippingFee * mockData[0].qty +
        mockData[1].product.shippingFee * mockData[1].qty +
        mockData[2].product.shippingFee * mockData[2].qty

    const expectedDomeResult = 0

    it('should calculate total product price', () => {
        const checkedArr = mockData.filter((p) => p.checked)
        const data = calculateProductPrice(checkedArr)

        expect(data).toBe(expectedProductPrice)
    })

    it('should calculate total intl fee ', () => {
        const checkedArr = mockData.filter((p) => p.checked)
        const data = calculateIntlShippingFee(checkedArr)
        expect(data).toBe(expectedIntlFeeResult)
    })

    it('should calculate total dome fee', () => {
        const data = calculateDomeShippingFee(mockData)
        expect(data).toBe(expectedDomeResult)
    })

    it('should calculate ', () => {
        const checkedArr = mockData.filter((p) => p.checked)
        const { totalProductPrice, domeShippingFee, intlShippingFee } = calcTotalPrice(checkedArr)
        expect(totalProductPrice).toBe(expectedProductPrice)
        expect(domeShippingFee).toBe(expectedDomeResult)
        expect(intlShippingFee).toBe(expectedIntlFeeResult)
    })
})
