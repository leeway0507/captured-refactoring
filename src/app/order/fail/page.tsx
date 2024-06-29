import Fail, { PaymentFailProps } from './client'

export const dynamic = 'force-static'

export default async function Page({ searchParams }: { searchParams: PaymentFailProps }) {
    return <Fail paymentFail={searchParams} />
}
