import Nav from '@/components/common/nav'
import { Mypage } from './mypage'

async function Page({ searchParams }: { searchParams: any }) {
    return (
        <>
            <Nav />
            <main className="page-container page-max-frame flex items-center flex-col  px-2 md:px-0">
                <Mypage searchParams={searchParams} />
            </main>
        </>
    )
}

export default Page
