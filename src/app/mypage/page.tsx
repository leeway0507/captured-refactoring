import { Login } from '../auth/signin/signin'
import Nav from '../../components/common/nav'

async function Page() {
    return (
        <>
            <Nav />
            <main className="page-container max-w-sm flex-center">
                <Login />
            </main>
        </>
    )
}

export default Page
