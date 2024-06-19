import Image from 'next/image'
import { Process, ShippingFee, RefundAndExchange, CustomFee } from './support/faq/contents'

export function ProductShipmentInfo({ type }: { type: 'intl' | 'dome' }) {
    const title = type === 'intl' ? '해외배송 상품' : '국내배송 상품'
    const src = `/icons/${type}-shipment.svg`
    const intlContent = (
        <>
            <div className="py-2">
                <div>도착 예정일 : 영업일 기준 5-15일 이내</div>
            </div>

            <div>
                <div>배송비</div>
                <div className="pt-1 ps-1 flex flex-col gap-1">
                    <div>• 가방, 악세서리, 모자 : 15,000원</div>
                    <div>• 반팔, 긴팔, 셔츠, 바지, 반바지 : 15,000원</div>
                    <div>• 가디건, 코트, 패딩, 후리스 : 19,000원</div>
                    <div>• 신발 : 19,000원</div>
                </div>
            </div>
        </>
    )

    const domeContent = (
        <>
            <div className="py-2">
                <div>도착 예정일 : 영업일 기준 1-3일 이내</div>
            </div>
            <div>배송비 : 3,000원</div>
        </>
    )

    const content = type === 'intl' ? intlContent : domeContent

    return (
        <div className=" text-sub-black rounded	">
            <div className="flex">
                <div className="flex-center basis-1/5">
                    <Image src={src} width={32} height={32} alt={type} />
                </div>
                <div className="basis-4/5">
                    <div className="flex flex-col px-2 my-3 py-2 border-s-2 border-black/80">
                        <div className="mx-1 text-lg my-1 font-semibold">{title}</div>
                        <div className="mx-1 text-sm text-justify">{content}</div>
                        <div>
                            <div className="font-semibold pt-4">
                                해당 상품이 정품임을 보증합니다.
                            </div>
                            <div className="text-sm">
                                구매 상품이 가품일 경우, 구매가의 2배를 보상합니다.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function CartShipmentInfo() {
    return (
        <div className="text-sub-black">
            <div className="flex">
                <div className="flex-center basis-1/6">
                    <Image
                        src="/icons/intl-shipment.svg"
                        width={32}
                        height={32}
                        alt="intl-shipment"
                    />
                </div>
                <div className="basis-5/6">
                    <div className="flex flex-col px-2 my-3 py-2 border-s-2 border-black/80">
                        <div className="mx-1 text-lg my-1 font-semibold">
                            해외 구매대행 상품 안내
                        </div>
                        <div className="mx-1 text-sm text-justify text-gray-500">
                            구매 상품 중 해외배송 상품이 포함되어 있습니다. 상품 구입을 위해
                            개인통관부호가 필요하며 5 - 15일의 배송기간이 소요됩니다.
                        </div>
                        <div>
                            <div className="font-semibold pt-4">
                                해당 상품이 정품임을 보증합니다.
                            </div>
                            <div className="text-sm text-gray-500 tracking-tight">
                                구매 상품이 가품일 경우, 구매가의 2배를 보상합니다.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const boxClass = 'bg-light-gray opacity-80 rounded-md border border-gray-200 px-3 py-6'

function SubTitle({ children }: { children: React.ReactNode }) {
    return <div className="text-xl font-medium pb-1 pt-8 ">{children}</div>
}
function Conent({ children }: { children: React.ReactNode }) {
    return <div className={`${boxClass}`}>{children}</div>
}
function Title({ children, closeModal }: { children: React.ReactNode; closeModal: () => void }) {
    return (
        <div className="sticky top-0 flex justify-between items-center bg-white z-20">
            <div className="text-2xl font-semibold whitespace-nowrap">{children}</div>
            <button type="button" onClick={closeModal}>
                ✕
            </button>
        </div>
    )
}

export function ProductShipmentInfoModal({ closeModal }: { closeModal: () => void }) {
    return (
        <div className="max-w-xl w-full h-full py-8 px-4 text-sm">
            <Title closeModal={closeModal}>배송 및 반품 안내사항</Title>
            <SubTitle>배송절차</SubTitle>
            <Conent>{Process}</Conent>
            <SubTitle>배송비</SubTitle>
            <Conent>{ShippingFee}</Conent>
            <SubTitle>관부가세</SubTitle>
            <Conent>{CustomFee}</Conent>
            <div className="text-xl font-semibold pt-8 pb-1" />
            <Conent>{RefundAndExchange}</Conent>
        </div>
    )
}
