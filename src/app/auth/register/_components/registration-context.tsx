import { createContext, useState, useContext, useMemo, ReactNode } from 'react'

interface Step1State {
    email: string
    username: string
    password: string
}

interface RegistrationContextType {
    step1: Step1State
    setStep1: (o: Step1State) => void
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined)

interface RegistrationContextWrapperProps {
    children: ReactNode
}

function RegistrationContextWrapper({ children }: RegistrationContextWrapperProps) {
    const [step1, setStep1] = useState<Step1State>({} as Step1State)

    const value = useMemo(() => ({ step1, setStep1 }), [step1])

    return <RegistrationContext.Provider value={value}>{children}</RegistrationContext.Provider>
}

export function useRegistrationContext() {
    const context = useContext(RegistrationContext)
    if (!context) {
        throw new Error('useRegistrationContext must be used within a RegistrationContextWrapper')
    }
    return context
}

export default RegistrationContextWrapper
