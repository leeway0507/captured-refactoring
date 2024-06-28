import Nav from '@/components/common/nav'
import { Suspense } from 'react'
import Spinner from '@/components/spinner/spinner'
import Footer from '@/components/common/footer'
import { Mypage } from './mypage'

async function Page({ searchParams }: { searchParams: any }) {
    return (
        <>
            <Nav />
            <main className="page-container page-max-frame flex items-center flex-col  px-2 md:px-0">
                <Suspense fallback={<Spinner />}>
                    <Mypage {...searchParams} />
                </Suspense>
            </main>
            <Footer />
        </>
    )
}

export default Page
