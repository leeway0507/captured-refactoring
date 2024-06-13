'use client'

import AccordionComponent from '@/app/utils/ui/accordion/accordion'
import { RefundProcess, QuestionInfo } from '../static/faq'

export const SizeInfo = <div>해외 배송 특성상 재고를 보유하고 있지 않아, 사이즈 안내가 불가합니다. </div>

function General() {
    return (
        <>
            <AccordionComponent
                title="상세 사이즈 문의가 가능한가요?"
                content={SizeInfo}
                cat="sizeInfo"
                titleClassNames="text-base"
            />
            <AccordionComponent
                title="예상 환불 기간이 궁금해요."
                content={RefundProcess}
                cat="refundProcess"
                titleClassNames="text-base"
            />
            <AccordionComponent
                title="직접 문의하고 싶어요."
                content={QuestionInfo}
                cat="questionInfo"
                titleClassNames="text-base"
            />
        </>
    )
}

export default General
