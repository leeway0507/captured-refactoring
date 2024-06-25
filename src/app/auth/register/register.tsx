'use client'

import { useState } from 'react'
import Step1 from './register-step-1'
import Step2 from './register-step-2'
import { Step1State } from './type'

const step2Adapter = (data: Step1State) => {
    const { username, ...rest } = data
    return {
        krName: username,
        ...rest,
    }
}

function Register() {
    const [step1Data, setStep1Data] = useState<Step1State>()

    return !step1Data ? (
        <Step1 setStep1Data={setStep1Data} />
    ) : (
        <Step2 step2Data={step2Adapter(step1Data)} />
    )
}

export default Register
