import Nav from '@/components/common/nav'
import Footer from '@/components/common/footer'
import Register from './register'

function Page() {
    return (
        <>
            <Nav />
            <main className="page-container max-w-lg flex-center flex-col ">
                <h1 className="text-2xl pt-8 pb-12">회원정보 입력</h1>
                <Register />
            </main>
            <Footer />
        </>
    )
}

export default Page
