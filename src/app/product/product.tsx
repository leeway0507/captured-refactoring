'use client'

import { ProductProps } from '../utils/hooks/data/type'
import useMobile from '../utils/hooks/interaction/view-size'
import * as General from './[sku]/components/general'
import * as Mobile from './[sku]/components/mobile'

export function MobileVIew({ product }: { product: ProductProps }) {
    return <div>Mobile</div>
}

export function GeneralView({ product }: { product: ProductProps }) {
    return (
        <General.Container>
            <General.ImageLayout>
                <General.ImageArr product={product} />
            </General.ImageLayout>

            <General.ProductLayout>
                <General.ProductInfo product={product} />
                <General.SizeBox product={product} />
                <General.Shipment product={product} />
                <General.Info />
            </General.ProductLayout>
        </General.Container>
    )
}

export default function Product({ product }: { product: ProductProps }) {
    const userView = useMobile()

    // TODO: 로딩중 이미지로 표시
    if (!userView) return null
    return userView === 'mobile' ? <MobileVIew product={product} /> : <GeneralView product={product} />
}
