import productMock from '@/__mocks__/product-data-api'
import useCart, {
    addToCartFn,
    findProductIndex,
    removeToCartFn,
    increaseQtyFn,
    decreaseQtyFn,
    addProductToCart,
    ProductCartProps,
} from '@/utils/hooks/data/product-cart'
import { renderHook, act } from '@testing-library/react'

describe('Product Cart', () => {
    const localKey = 'cr_t'
    const product = productMock[0]
    const selectedSize = product.size[0]
    let cart: ProductCartProps[] = []
    const setCart = (newCart: ProductCartProps[]) => {
        cart = newCart
    }

    beforeEach(() => {
        cart = []
        localStorage.removeItem(localKey)
    })

    it('should add a new item to cart', () => {
        addProductToCart(cart, setCart, product, selectedSize)
        const expectedResult = [{ product, size: selectedSize, qty: 1, checked: true }]

        expect(cart).toEqual(expectedResult)
    })
    it('should remove the cart', () => {
        cart = [{ product, size: selectedSize, qty: 3, checked: true }]
        removeToCartFn(cart, setCart, product, selectedSize)

        const expectedResult: any = []
        expect(cart).toEqual(expectedResult)
    })

    it('should return product idx', () => {
        cart = [{ product, size: selectedSize, qty: 1, checked: true }]
        const idx = findProductIndex(cart, product, selectedSize)
        expect(idx).toBe(0)

        const cartDataUpdated = [{ product, size: '123', qty: 1, checked: true }]
        const idxSecond = findProductIndex(cartDataUpdated, product, selectedSize)
        expect(idxSecond).toBe(-1)
    })

    it('should increase the product qty', () => {
        cart = [{ product, size: selectedSize, qty: 1, checked: true }]
        increaseQtyFn(cart, setCart, product, selectedSize)

        const expectedResult = [{ product, size: selectedSize, qty: 2, checked: true }]
        expect(cart).toEqual(expectedResult)
    })

    it('should decrease the product qty', () => {
        cart = [{ product, size: selectedSize, qty: 2, checked: true }]

        // qty 2 -> 1
        decreaseQtyFn(cart, setCart, product, selectedSize)

        const expectedResult1 = [{ product, size: selectedSize, qty: 1, checked: true }]
        expect(cart).toEqual(expectedResult1)

        // qty 1 -> remove Product To Cart
        decreaseQtyFn(cart, setCart, product, selectedSize)

        const expectedResult2: any = []
        expect(cart).toEqual(expectedResult2)
    })

    it('should add and update an item to Cart', () => {
        // add a new Items
        addToCartFn(cart, setCart, product, selectedSize)
        const expectedResult = [{ product, size: selectedSize, qty: 1, checked: true }]
        expect(cart).toEqual(expectedResult)

        // increase the product qty
        addToCartFn(cart, setCart, product, selectedSize)
        const expectedResultSecond = [{ product, size: selectedSize, qty: 2, checked: true }]
        expect(cart).toEqual(expectedResultSecond)
    })

    it('should add an item to Cart', () => {
        const { result } = renderHook(() => {
            const { addToCart } = useCart()
            return addToCart
        })

        const addToCart = result.current
        act(() => addToCart(product, selectedSize))

        const cartArr = localStorage.getItem(localKey)
        const expectedResult = [{ product, size: selectedSize, qty: 1, checked: true }]
        expect(cartArr).toBe(JSON.stringify(expectedResult))
    })
})
