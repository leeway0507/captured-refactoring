import Cart from './cart'
import Nav from '../static/nav'
import Footer from '../static/footer'

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
