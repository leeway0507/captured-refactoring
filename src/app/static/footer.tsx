import Link from 'next/link'

function FooterNavBar() {
    return (
        <section className="flex gap-3 font-bold">
            <Link href="/static/support/faq">자주 묻는 질문</Link>
            <Link href="/mypage">주문조회</Link>
            <Link target="_blank" href={process.env.NEXT_PUBLIC_INSTARGRAM_URL!}>
                인스타그램
            </Link>
            <Link
                target="_blank"
                href={process.env.NEXT_PUBLIC_CUSTOM_ID_URL!}
                className="tracking-tight"
            >
                통관부호 발급
            </Link>
        </section>
    )
}

function CompanyInfo() {
    return (
        <>
            <section className="flex flex-col mb-1">
                <div className="font-bold">스톡헌터스</div>
                <div>사업자등록번호 372-55-00754 | 대표자 이양우 </div>
                <div>0502-1935-3403 | {process.env.NEXT_PUBLIC_CUSTOMER_EMAIL} </div>
                <div>서울시 양천구 목동중앙로 143 101, 801</div>
            </section>
            <div>COPY RIGHT © 2024 CAPTURED. ALL RIGHT RESERVED.</div>
        </>
    )
}

function Policy() {
    return (
        <section className="flex gap-1 mb:gap-4 ">
            <Link href="/static/policy/service" className="hover:text-main-black">
                서비스 이용약관 |
            </Link>
            <Link href="/static/policy/privacy" className="hover:text-main-black">
                개인정보 처리방침 |
            </Link>
            <Link
                href="/static/policy/privacy/agreement-third-party"
                className="hover:text-main-black"
            >
                개인정보 제3자 제공 동의
            </Link>
        </section>
    )
}

export default function Footer() {
    return (
        <footer className="bg-gray-100 pt-8 pb-12 text-sm px-6">
            <div className="page-max-frame w-full flex flex-col gap-2 mx-auto">
                <FooterNavBar />
                <CompanyInfo />
                <Policy />
            </div>
        </footer>
    )
}
