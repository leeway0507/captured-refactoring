import Logo from '@/components/common/logo'
import Spinner from '@/components/spinner/spinner'
import { Suspense } from 'react'
import Order from './order'

async function Page() {
    return (
        <>
            <nav className="py-4 borer-b text-center border-b shadow w-full">
                <Logo />
            </nav>
            <main className="page-container max-w-5xl h-full pt-2 md:pt-10">
                <Suspense fallback={<Spinner />}>
                    <Order />
                </Suspense>
            </main>
        </>
    )
}

export default Page
