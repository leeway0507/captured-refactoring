import productMock from '@/__mocks__/product-data-api'
import useCart, {
    addToCartFn,
    findProductIndex,
    updateProductQty,
    addProductToCart,
    ProductCartProps,
} from '@/app/utils/hooks/data/product-cart'
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
        addProductToCart(cart, product, selectedSize, setCart)

        const expectedResult = [{ product, size: selectedSize, qty: 1 }]

        expect(cart).toEqual(expectedResult)
    })

    it('should return product idx', () => {
        const cartData = [{ product, size: selectedSize, qty: 1 }]
        const idx = findProductIndex(cartData, product, selectedSize)
        expect(idx).toBe(0)

        const cartDataSecond = [{ product, size: '123', qty: 1 }]
        const idxSecond = findProductIndex(cartDataSecond, product, selectedSize)
        expect(idxSecond).toBe(-1)
    })

    it('should increase the product qty', () => {
        const cartData = [{ product, size: selectedSize, qty: 1 }]
        const idx = findProductIndex(cartData, product, selectedSize)
        updateProductQty(cartData, idx, setCart)

        const expectedResult = [{ product, size: selectedSize, qty: 2 }]
        expect(cart).toEqual(expectedResult)
    })

    it('should add and update an item to Cart', () => {
        // add a new Items
        addToCartFn(cart, setCart, product, selectedSize)
        const expectedResult = [{ product, size: selectedSize, qty: 1 }]
        expect(cart).toEqual(expectedResult)

        // increase the product qty
        addToCartFn(cart, setCart, product, selectedSize)
        const expectedResultSecond = [{ product, size: selectedSize, qty: 2 }]
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
        const expectedResult = [{ product, size: selectedSize, qty: 1 }]
        expect(cartArr).toBe(JSON.stringify(expectedResult))
    })
})
