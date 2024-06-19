import Logo from '../../../logo'
import PersonalInfo from './agreement-personal-info'

export default function page() {
    return (
        <>
            <header className="flex-center py-8 ">
                <Logo />
            </header>
            <main className="max-w-3xl text-sm text-justify mx-auto">
                <PersonalInfo />
            </main>
        </>
    )
}
