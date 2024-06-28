import Nav from '@/components/common/nav'
import Footer from '@/components/common/footer'
import { ResetPasswordForm } from './reset-password'

async function Page() {
    return (
        <>
            <Nav />
            <main className="page-container max-w-sm flex-center flex-col">
                <h1 className="text-2xl pt-8 pb-12">비밀번호 찾기</h1>
                <ResetPasswordForm />
            </main>
            <Footer />
        </>
    )
}

export default Page
