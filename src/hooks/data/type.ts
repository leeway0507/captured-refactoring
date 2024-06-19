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
