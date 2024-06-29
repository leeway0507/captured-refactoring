'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { ProductProps } from '@/types'
import * as Prod from './layer'

const RecentView = dynamic(() => import('./recent-view'), { ssr: false })

export default function Product({ product }: { product: ProductProps }) {
    const [selected, setSelected] = useState<string>()
    return (
        <>
            <Prod.Container>
                <Prod.ImageLayer product={product} />
                <Prod.InfoLayout>
                    <Prod.ProductInfo product={product} />
                    <Prod.SizeBox product={product} selected={selected} setSelected={setSelected} />
                    <Prod.AddToCart product={product} selected={selected!} />
                    <Prod.Shipment product={product} />
                    <Prod.Info />
                </Prod.InfoLayout>
            </Prod.Container>
            <RecentView product={product} />
        </>
    )
}
