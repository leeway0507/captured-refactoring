'use client'

import { useState } from 'react'
import Step1 from './register-step-1'
import Step2 from './register-step-2'
import RegistrationContextWrapper from './_components/registration-context'

function Register() {
    const [nextStep, setNextStep] = useState(false)

    return (
        <RegistrationContextWrapper>
            {!nextStep ? <Step1 setNextStep={setNextStep} /> : <Step2 />}
        </RegistrationContextWrapper>
    )
}

export default Register
