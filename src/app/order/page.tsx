import Nav from '../../components/common/nav'
import { signOutAction } from '../auth/_actions/action'

async function Page() {
    return (
        <>
            <Nav />
            <main className="page-container max-w-sm flex-center">
                <form action={signOutAction}>
                    <button type="submit">SIGN OUT</button>
                </form>
            </main>
        </>
    )
}

export default Page
