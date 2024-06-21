import CategoryLayout from '@/components/banner/category-layout'
import NewestItem from '@/components/banner/newest-item-layout'
import BrandItemsLayOutOne from '@/components/banner/brand-items-layout-one'
import BrandItemsLayOutTwo from '@/components/banner/brand-items-layout-two'
import MainLayout from '@/components/banner/main-layout'
import BrandList from '@/components/banner/brand-layout'
import Footer from '../../components/common/footer'
import Nav from '../../components/common/nav'

export default async function Home() {
    return (
        <>
            <Nav />
            <main className="page-container flex flex-col w-full gap-12 lg:gap-24">
                <MainLayout />
                <BrandItemsLayOutOne brandName="arc'teryx" />
                <BrandList />
                <BrandItemsLayOutOne brandName="adidas originals" />
                <NewestItem />
                <CategoryLayout />
                <BrandItemsLayOutTwo brandName="patagonia" />
            </main>
            <Footer />
        </>
    )
}
