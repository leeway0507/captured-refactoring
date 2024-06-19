import { ProductCartProps } from '@/hooks/data/product-cart'

export const calculateProductPrice = (arr: ProductCartProps[]) =>
    arr?.reduce((result, item) => result + item.product.price * item.qty, 0)

export const calculateDomeShippingFee = (arr: ProductCartProps[]) =>
    arr?.reduce(
        (result, item) =>
            item.product.intl === false ? result + item.product.shippingFee * item.qty : result,
        0,
    )

export const calculateIntlShippingFee = (arr: ProductCartProps[]) =>
    arr?.reduce(
        (result, item) =>
            item.product.intl === true ? result + item.product.shippingFee * item.qty : result,
        0,
    )

const calcTotalPrice = (arr: ProductCartProps[]) => {
    const checkedArr = arr.filter((p) => p.checked)
    const totalProductPrice = calculateProductPrice(checkedArr)
    const domeShippingFee = calculateDomeShippingFee(checkedArr)
    const intlShippingFee = calculateIntlShippingFee(checkedArr)

    return { totalProductPrice, domeShippingFee, intlShippingFee }
}

export default calcTotalPrice
