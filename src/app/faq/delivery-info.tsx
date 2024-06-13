import AccordionComponent from '../utils/ui/accordion/accordion'
import { Process, ShippingFee, CustomFee, NotYetShipped, Package, RefundAndExchange } from '../static/faq'

export default function DeliveryInfo() {
    return (
        <>
            <div className="text-xl font-bold pt-4 pb-2">배송 문의</div>
            <AccordionComponent
                title="해외 배송과 국내 배송 차이가 궁금해요."
                content={Process}
                cat="process"
                titleClassNames="text-base"
            />
            <AccordionComponent
                title="배송비를 알고싶어요."
                content={ShippingFee}
                cat="shippingFee"
                titleClassNames="text-base"
            />
            <AccordionComponent
                title="관부가세 대납 여부를 알고싶어요."
                content={CustomFee}
                cat="customFee"
                titleClassNames="text-base"
            />
            <AccordionComponent
                title="배송 상태를 알고 싶어요."
                content={NotYetShipped}
                cat="notYetShipped"
                titleClassNames="text-base"
            />
            <AccordionComponent
                title="해외 배송 시 묶음 배송이 가능한가요?"
                content={Package}
                cat="package"
                titleClassNames="text-base"
            />
            <AccordionComponent
                title="반품 및 취소 방법을 알고싶어요."
                content={RefundAndExchange}
                cat="refundAndExchange"
                titleClassNames="text-base"
            />
        </>
    )
}
