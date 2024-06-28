'use client'

import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export interface PaymentFailProps {
    message: string
    code: string
}

function Fail({ paymentFail }: { paymentFail: PaymentFailProps }) {
    useEffect(() => {
        alert(paymentFail.message)
        redirect('/cart')
    }, [])
    return null
}

export default Fail
