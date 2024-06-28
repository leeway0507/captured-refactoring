import Footer from '@/components/common/footer'
import { Suspense } from 'react'
import Spinner from '@/components/spinner/spinner'
import SignIn from './signin'
import { RegisterAndResetPassword, OauthButton } from './buttons'
import Nav from '../../../components/common/nav'

async function Page() {
    return (
        <>
            <Nav />
            <main className="flex md:pt-48 page-container max-w-sm flex-col w-full gap-3 px-4">
                <Suspense fallback={<Spinner />}>
                    <SignIn />
                </Suspense>
                <RegisterAndResetPassword />
                <OauthButton />
            </main>
            <Footer />
        </>
    )
}

export default Page
