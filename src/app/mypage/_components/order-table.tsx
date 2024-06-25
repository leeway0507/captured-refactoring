import { KRW } from '@/utils/currency'
import { OrderInfoProps } from '@/hooks/data/type'
import Link from 'next/link'

function OrderTableHeader() {
    return (
        <div className="border-b border-black/90 h-10 text-nowrap grid grid-cols-4">
            <div>주문번호</div>
            <div>주문상태</div>
            <div>주문일</div>
            <div>결제금액</div>
        </div>
    )
}

function OrderTableRow({ data }: { data: OrderInfoProps }) {
    const row =
        'hover:bg-gray-100 odd:bg-slate-50 hover:cursor-pointer grid grid-cols-4 place-items-center text-xs'
    return (
        <Link href={`?orderId=${data.orderId}`} className={`${row}`}>
            <div className="text-nowrap p-4">{data.userOrderNumber}</div>
            <div className="text-nowrap p-4">{data.orderStatus}</div>
            <div className="p-4">{data.orderedAt.replace('T', ' ')}</div>
            <div className="text-nowrap p-4">{KRW(data.orderTotalPrice)}</div>
        </Link>
    )
}

function OrderTableBody({ data }: { data: OrderInfoProps[] }) {
    return data.map((d) => <OrderTableRow key={d.userOrderNumber} data={d} />)
}

const tableClass = 'w-full text-sm text-center mx-auto'
export default function OrderTable({ orderHistory }: { orderHistory: OrderInfoProps[] }) {
    return (
        <div className={`${tableClass}`} key="order">
            <OrderTableHeader />
            <OrderTableBody data={orderHistory} />
        </div>
    )
}
