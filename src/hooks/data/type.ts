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
export interface ProductFilterSearchParamsProps {
    page?: string
    pageType?: string
    sortBy?: string
    brand?: string
    categorySpec?: string
    size?: string
    delivery?: string
    price?: string | number[]
}

export interface ProductPagesProps {
    [key: number]: ProductProps[]
}

export interface ProductDataStoreProps {
    filter: string
    data: ProductPagesProps
    lastPage: string
}

export interface ProductCartProps {
    product: ProductProps
    size: string
    quantity: number
    checked: boolean
}

export interface OrderHistoryProps {
    orderId: string
    userOrderNumber: number
    orderedAt: string
    orderStatus: string
    paymentStatus: string
    addressId: string
    orderTotalPrice: number
    paymentMethod: string
}
export interface OrderItemProps extends Omit<ProductProps, 'size'> {
    orderNum: number
    orderId: string
    size: string
    quantity: number
    deliveryStatus: string
    deliveryNumber: string
    deliveryCompany: string
}

export interface OrderHistoryRequestProps {
    paymentKey: string
    orderId: string
    orderedAt: Date
    orderTotalPrice: Number
    paymentMethod: String
    paymentInfo: String
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

export interface AddressFormProps {
    krName: string
    enName: string
    customId: string
    phone: string
    krAddress: string
    krAddressDetail: string
    enAddress: string
    enAddressDetail: string
}

export interface SignUpFormProps extends AddressFormProps {
    addressId: string
    email: string
    password: string
}

export interface RequestItemCheckProps {
    sku: number
    size: string
    quantity: number
}
export interface CheckCartItemResultProps {
    [form: string]: boolean
}
