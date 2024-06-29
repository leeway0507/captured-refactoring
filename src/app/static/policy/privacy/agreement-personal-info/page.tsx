import Logo from '../../../../../components/common/logo'
import PersonalPolicy from './agreement-personal-info'

export default function page() {
    return (
        <>
            <header className="flex-center py-8 ">
                <Logo />
            </header>
            <main className="max-w-3xl  text-justify mx-auto">
                <PersonalPolicy />
            </main>
        </>
    )
}
