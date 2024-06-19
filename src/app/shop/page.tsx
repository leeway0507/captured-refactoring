import dynamic from 'next/dynamic'
import { fetchProductList } from '@/hooks/data/product-list-fetch'
import { ProductSearchParmasProps } from '@/hooks/data/type'
import Footer from '../static/footer'
import Nav from '../static/nav'

async function Page({ searchParams }: { searchParams: ProductSearchParmasProps }) {
    // ssr Off : localStorage에 저장되어있는 데이터와 productResponse를 비교하는 로직이 존재하므로 ssr 해지 필요
    const ProductList = dynamic(() => import('./infinite-scroll'), { ssr: false })
    const productResponse = await fetchProductList(searchParams)
    return (
        <>
            <Nav />
            <main className="page-container page-max-frame grow flex flex-col w-full">
                <ProductList productFilter={searchParams} productResponse={productResponse} />
            </main>
            <Footer />
        </>
    )
}

export default Page
