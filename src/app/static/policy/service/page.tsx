import Logo from '../../../../components/common/logo'
import ServicePolicy from './service-policy'

export default function page() {
    return (
        <>
            <header className="flex-center py-8 ">
                <Logo />
            </header>
            <main className="max-w-3xl  text-justify mx-auto">
                <ServicePolicy />
            </main>
        </>
    )
}
