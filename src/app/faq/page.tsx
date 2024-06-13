import DeliveryInfo from './delivery-info'
import General from './general'

const main = 'text-3xl font-bold mb-4 w-full flex-center'
export default function Page() {
    return (
        <div className="max-w-2xl w-full pt-4 pb-16 px-8 text-sm mx-auto flex-left flex-col">
            <div className="w-full max-w-xl h-full">
                <div className={`${main} me-8`}>자주 묻는 질문</div>
                <DeliveryInfo />
                <div className="text-xl font-bold pt-4 pb-2">일반</div>
                <General />
            </div>
        </div>
    )
}
