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
            <Mobile.ButtonBox product={product} selected={selected!} />
            <General.ProductInfo product={product} />
            <General.SizeBox product={product} selected={selected} setSelected={setSelected} />
            <General.Shipment product={product} />
            <General.Info />
            <Mobile.RecentViewM product={product} />
        </Mobile.Container>
    )
}

export function GeneralView({ product }: { product: ProductProps }) {
    const [selected, setSelected] = useState<string>()
    return (
        <General.Container>
            <General.ProductLayout>
                <General.ImageLayout>
                    <General.ImageArr product={product} />
                </General.ImageLayout>
                <General.InfoLayout>
                    <General.ProductInfo product={product} />
                    <General.SizeBox
                        product={product}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <General.AddToCartButton product={product} selected={selected!} />
                    <General.Shipment product={product} />
                    <General.Info />
                </General.InfoLayout>
            </General.ProductLayout>
            <General.RecentView product={product} />
        </General.Container>
    )
}

export default function Product({ product }: { product: ProductProps }) {
    const userView = useMobile()

    if (!userView) return null

    return userView === 'mobile' ? (
        <MobileVIew product={product} />
    ) : (
        <GeneralView product={product} />
    )
}
