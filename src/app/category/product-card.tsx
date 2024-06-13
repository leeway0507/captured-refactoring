"use client"

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { ProductProps, ProductFetchResponseProps, ProductPagesProps, ProductSearchParmasProps } from "@/app/hook/data/type"
import useProductDataStore from "../hook/data/product-stores";
import updatePageParams from "./product-infinite-scroll";
import useIntersectionObserver from "../hook/interaction/infinite-scroll";

function NoData() {
    return (
        <div className="flex flex-col mx-auto h-full tb:p-16 ">
            <div className="text-xl tb:text-3xl pb-2 m-auto">요청 결과가 존재하지 않습니다.</div>
        </div>
    )
}

function ProductImage({ sku }: { sku: string }) {
    const productImgUrl = `${process.env.NEXT_PUBLIC_CDN}/product/${sku}/main.webp`;

    return (
        <div className="relative w-full aspect-[1/1.2] mx-auto bg-gray-50 vignette rounded">
            <Image
                src={productImgUrl}
                alt={sku}
                fill
                className="object-cover"
                quality={95}
                priority
                unoptimized
            />
        </div>
    )
}

function Description({ product }: { product: ProductProps }) {
    const { brand, productName, price, productId, intl } = product;
    const shotenProductName = productName.length > 25 ? `${productName.slice(0, 25)}...` : productName;
    return (
        <div className="flex flex-col text-sub-black pt-1 px-1">
            <div className="h-[50px]">{`${brand} ${shotenProductName} | ${productId.toUpperCase()}`}</div>
            <div className="py-2 font-bold inline-block">
                {intl ? "해외배송" : "국내배송"} | ₩ {price.toLocaleString()}
            </div>
        </div>
    )
}

function ProductCard({ product }: { product: ProductProps }) {
    const { sku } = product;

    return (
        <Link href={`/product/${sku}`} className="text-sub-black text-xs font-light pb-6 z-1 max-w-[300px]">
            <ProductImage sku={String(sku)} />
            <Description product={product} />
        </Link>
    )
}


function ProductGrid({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 page-container">
            {children}
        </div>
    )
}
function IntersectionTrigger({ refer, page, lastPage }: { refer: React.RefObject<HTMLDivElement>, page: string, lastPage: string }) {
    return <div ref={refer} data-page={page} data-last-page={lastPage} className="h-1" />
}


function InfiniteScrollProductCardArr({ lastPage, page, data }: { lastPage: string, page: string, data: ProductProps[] }) {
    const ref = useIntersectionObserver(updatePageParams)
    return (
        <>
            <ProductGrid >
                {data.map(product => <ProductCard product={product} key={product.sku} />)}
            </ProductGrid >
            <IntersectionTrigger refer={ref} page={page} lastPage={lastPage} />
        </>
    )
}


function ProductComponent({ productPages, lastPage }: { productPages: ProductPagesProps, lastPage: string }) {
    const productPageArr: [string, ProductProps[]][] = Object.entries(productPages)
    return productPageArr.map(
        ([page, data]) =>
            <InfiniteScrollProductCardArr
                lastPage={lastPage}
                page={page}
                data={data}
                key={page}
            />
    )
}


export default function Product({ productFilter, productResponse }:
    { productFilter: ProductSearchParmasProps, productResponse: ProductFetchResponseProps }) {

    const ProductStores = useProductDataStore(productFilter, productResponse)

    // TODO:no Data 체크
    if (!ProductStores) return null
    if (!productResponse.data) return <NoData />
    return <ProductComponent productPages={ProductStores.data} lastPage={ProductStores.lastPage} />

}

