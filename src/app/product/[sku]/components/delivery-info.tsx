import React from 'react'
import { Process, ShippingFee, RefundAndExchange, CustomFee } from '@/app/static/faq'

const boxClass = 'bg-light-gray opacity-80 rounded-md border border-deep-gray px-3 py-6'

function SubTitle({ children }: { children: React.ReactNode }) {
    return <div className="text-xl font-bold pb-1 ">{children}</div>
}
function Conent({ children }: { children: React.ReactNode }) {
    return <div className={`${boxClass}`}>{children}</div>
}
function Title({ closeModal }: { closeModal: () => void }) {
    return (
        <div className="sticky top-0 flex justify-between items-center py-3 bg-white z-20">
            <div className="text-xl font-bold whitespace-nowrap">배송 및 반품 안내사항</div>
            <button type="button" onClick={closeModal}>
                ✕
            </button>
        </div>
    )
}

function DeliveryInfo({ closeModal }: { closeModal: () => void }) {
    return (
        <div className="max-w-xl w-full h-full py-8 px-4">
            <Title closeModal={closeModal} />
            <SubTitle>배송절차</SubTitle>
            <Conent>{Process}</Conent>
            <SubTitle>배송비</SubTitle>
            <Conent>{ShippingFee}</Conent>
            <SubTitle>관부가세</SubTitle>
            <Conent>{CustomFee}</Conent>
            <div className="text-xl font-bold pt-8 pb-1" />
            <Conent>{RefundAndExchange}</Conent>
        </div>
    )
}

export default DeliveryInfo
