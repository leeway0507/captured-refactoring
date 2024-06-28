import SignUpForm from '@/app/mypage/_components/sign-up-form'
import { Step2State } from './type'

export default function Step2({ step2Data }: { step2Data: Step2State }) {
    return <SignUpForm defaultValue={step2Data} />
}
