'use client'

import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Button } from '@/components/shadcn-ui/button'
import { FormField } from '@/components/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFormContext, useForm } from 'react-hook-form'

import useCountDown from '@/hooks/interaction/countdown'

function EmailVerificationDialog({
    isOpen,
    handleClose,
    setIsverfied,
}: {
    isOpen: boolean
    handleClose: () => void
    setIsverfied: (b: boolean) => void
}) {
    const [resetCount, setResetCount] = useState(false)
    const { defaultTimeFormat, seconds } = useCountDown(resetCount)

    const handleSend = () => {
        // TODO : 메일 보내는 로직
        alert('입력하신 메일주소로 인증코드를 발급했습니다.')
        setResetCount((old) => !old)
    }

    const FormSchema = z.object({
        code: z.string().min(6, { message: '6자리 인증코드를 입력해주세요.' }),
    })

    const codeForm = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    useEffect(() => {
        if (isOpen) handleSend()
    }, [isOpen])

    const onSubmit = (data: object) => {
        // TODO: 코드 증명 로직
        alert('인증을 완료했습니다.')
        handleClose()
        setIsverfied(true)
    }
    return (
        <Dialog open={isOpen} onClose={() => {}} className="relative z-50">
            <div className="fixed inset-0 w-screen bg-black/30 h-full">
                <div className="flex items-center justify-center p-4 h-full">
                    <DialogPanel className="relative max-w-2xl space-y-4 bg-white border py-6 px-6 overflow-auto max-h-[95%] rounded">
                        <div className="absolute top-2 right-5">
                            <Button variant="ghost" size="icon" onClick={handleClose}>
                                <X size="20px" />
                            </Button>
                        </div>
                        <div className="flex w-full items-end">
                            <FormField
                                form={codeForm}
                                formName="code"
                                label="인증번호 입력"
                                type="string"
                            />
                            <Button
                                variant="ghost"
                                type="button"
                                onClick={codeForm.handleSubmit(onSubmit)}
                                className=""
                                disabled={seconds < 0}
                            >
                                확인
                            </Button>
                        </div>

                        <div className="flex justify-between text-sm px-2">
                            <div>{defaultTimeFormat(seconds)}</div>
                            <button
                                type="button"
                                className="underline text-gray-500"
                                onClick={handleSend}
                            >
                                인증코드 재발송
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default function EmailVerificationButton({
    isVerfied,
    setIsverfied,
}: {
    isVerfied: boolean
    setIsverfied: (b: boolean) => void
}) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const form = useFormContext()
    const state = form.getFieldState('email')
    const verified = state.isDirty && !state.error

    return (
        <>
            <Button
                className="text-xs"
                type="button"
                onClick={() => setIsOpen(true)}
                disabled={!verified || isVerfied}
            >
                {isVerfied ? '인증 확인' : '이메일 인증'}
            </Button>
            <EmailVerificationDialog
                isOpen={isOpen}
                handleClose={() => setIsOpen(false)}
                setIsverfied={setIsverfied}
            />
        </>
    )
}
