import { Login } from './signin'
import { RegisterAndResetPassword, OauthButton } from './buttons'
import Nav from '../../../components/common/nav'

async function Page() {
    return (
        <>
            <Nav />
            <main className="flex md:flex-center page-container max-w-sm flex-col w-full gap-3 px-4">
                <Login />
                <RegisterAndResetPassword />
                <OauthButton />
            </main>
        </>
    )
}

export default Page
