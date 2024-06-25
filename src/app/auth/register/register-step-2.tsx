import AddressForm from '@/app/mypage/address-form'
import { Step2State } from './type'

export default function Step2({ step2Data }: { step2Data: Step2State }) {
    return <AddressForm formType="signUp" defaultValue={step2Data} />
}
