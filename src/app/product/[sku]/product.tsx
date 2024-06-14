'use client'

import { useState } from 'react'
import { ProductProps } from '../../utils/hooks/data/type'
import useMobile from '../../utils/hooks/interaction/view-size'
import * as General from './components/general'
import * as Mobile from './components/mobile'

export function MobileVIew({ product }: { product: ProductProps }) {
    const [selected, setSelected] = useState<string>()
    return (
        <Mobile.Container>
            <Mobile.SlideImage product={product} />
            <General.ProductInfo product={product} />
            <General.SizeBox product={product} selected={selected} setSelected={setSelected} />
            <Mobile.CartBox product={product} selected={selected!} />
            <General.Shipment product={product} />
            <General.Info />
        </Mobile.Container>
    )
}

export function GeneralView({ product }: { product: ProductProps }) {
    const [selected, setSelected] = useState<string>()
    return (
        <General.Container>
            <General.ImageLayout>
                <General.ImageArr product={product} />
            </General.ImageLayout>

            <General.ProductLayout>
                <General.ProductInfo product={product} />
                <General.SizeBox product={product} selected={selected} setSelected={setSelected} />
                <General.AddToCart product={product} selected={selected!} />
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
