import Image from 'next/image'

export default function ShipmentForm({ type }: { type: 'intl' | 'dome' }) {
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
        <div className=" text-sub-black tracking-tightest rounded	">
            <div className="flex">
                <div className="flex-center basis-1/5">
                    <Image src={src} width={32} height={32} alt={type} />
                </div>
                <div className="basis-4/5">
                    <div className="flex flex-col px-2 my-3 py-2 border-s-2 border-sub-black">
                        <div className="mx-1 text-lg my-1 font-bold">{title}</div>
                        <div className="mx-1 tracking-[0.2rem] text-sm text-justify">{content}</div>
                        <div>
                            <div className="font-bold pt-4">해당 상품이 정품임을 보증합니다.</div>
                            <div className="text-sm">구매 상품이 가품일 경우, 구매가의 2배를 보상합니다.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
