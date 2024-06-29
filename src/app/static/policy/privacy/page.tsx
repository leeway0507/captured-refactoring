import Logo from '../../../../components/common/logo'
import PrivacyPolicy from './privacy-policy'

export default function page() {
    return (
        <>
            <header className="flex-center py-8 ">
                <Logo />
            </header>
            <main className="max-w-3xl  text-justify mx-auto">
                <PrivacyPolicy />
            </main>
        </>
    )
}
