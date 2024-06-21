import Cart from './cart'
import Nav from '../../components/common/nav'
import Footer from '../../components/common/footer'

async function Page() {
    return (
        <>
            <Nav />
            <main className="page-container page-max-frame">
                <Cart />
            </main>
            <Footer />
        </>
    )
}

export default Page
