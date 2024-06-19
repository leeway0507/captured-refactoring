import Link from 'next/link'
import { brandIndex } from '../static/metadata'
import Nav from '../static/nav'
import Footer from '../static/footer'

function Brand({ brandName }: { brandName: string }) {
    return (
        <Link href={`shop/?brand=${brandName}`}>
            <div className="uppercase">{brandName}</div>
        </Link>
    )
}

function BrandIndex({ alphabet, brandArr }: { alphabet: string; brandArr: string[] }) {
    return (
        <section className="mx-auto w-[80%] flex flex-col pb-8">
            <h1 className="text-2xl md:text-3xl border-b ps-1">{alphabet}</h1>
            <div className="py-2 flex flex-col gap-1">
                {brandArr.map((brandName: string) => (
                    <Brand key={brandName} brandName={brandName} />
                ))}
            </div>
        </section>
    )
}

async function Page() {
    const brandIndexBox =
        'grid grid-cols-1 md:grid-cols-4 py-4 md:py-8 w-full gap-1 mx-auto max-w-5xl'
    return (
        <>
            <Nav />
            <main className="page-container">
                <h1 className="flex-center text-3xl md:text-4xl py-4 md:py-8 tracking-[.15em]">
                    BRAND
                </h1>
                <div className={`${brandIndexBox}`}>
                    {Object.entries(brandIndex).map(([alphabet, brandArr]) => (
                        <BrandIndex key={alphabet} alphabet={alphabet} brandArr={brandArr} />
                    ))}
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Page
