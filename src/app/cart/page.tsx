import Cart from './cart'
import Nav from '../../components/common/nav'
import Footer from '../../components/common/footer'

async function Page() {
    return (
        <>
            <Nav />
            <main className="page-container max-w-5xl flex">
                <Cart />
            </main>
            <Footer />
        </>
    )
}

export default Page
