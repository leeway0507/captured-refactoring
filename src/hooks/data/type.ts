export interface ProductProps {
    sku: number
    brand: string
    korBrand: string
    productName: string
    korProductName: string
    productId: string
    price: number
    shippingFee: number
    intl: boolean
    imgType: string
    category: string
    color: string
    categorySpec: string
    size: string[]
    deploy: number
}

export type ProductFetchResponseProps = {
    data: ProductProps[]
    currentPage: number
    lastPage: number
}

export interface ProductFilterParamsProps {
    pageType?: string[]
    sortBy?: string[]
    brand?: string[]
    categorySpec?: string[]
    size?: string[]
    delivery?: string[]
    price?: string[]
}

export interface ProductPagesProps {
    [key: number]: ProductProps[]
}

export interface ProductDataStoreProps {
    filter: string
    data: ProductPagesProps
    lastPage: string
}
export interface ProductSearchParmasProps {
    page?: string
    brand?: string
}

export interface OrderInfoProps {
    orderId: string
    userOrderNumber: number
    orderedAt: string
    orderStatus: string
    paymentStatus: string
    addressId: string
    orderTotalPrice: number
    paymentMethod: string
}
export interface OrderProductProps extends Omit<ProductProps, 'size'> {
    orderNum: number
    orderId: string
    sku: number
    size: string
    quantity: number
    deliveryStatus: string
    deliveryNumber: string
    deliveryCompany: string
}
export interface AddressProps {
    addressId?: string
    krName: string
    enName: string
    customId: string
    phone: string
    krAddress: string
    krAddressDetail: string
    enAddress: string
    enAddressDetail: string
}

export interface AddressFormProps extends AddressProps {
    addressId?: string
    email?: string
    password?: string
    krName: string
    enName: string
    customId: string
    phone: string
    krAddress: string
    krAddressDetail: string
    enAddress: string
    enAddressDetail: string
}
