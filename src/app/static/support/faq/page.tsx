import { ShipmentAccordion, GeneralAccordion } from './faq-accordion'
import Nav from '../../nav'
import Footer from '../../footer'

export default function Page() {
    return (
        <>
            <Nav />
            <main className="page-container max-w-xl mt-8">
                <h1 className="text-3xl font-semibold mb-4 w-full me-8 flex-center">
                    자주 묻는 질문
                </h1>
                <ShipmentAccordion />
                <GeneralAccordion />
            </main>
            <Footer />
        </>
    )
}
