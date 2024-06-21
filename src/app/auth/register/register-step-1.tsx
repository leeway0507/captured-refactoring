'use client'

import { UserNameField, EmailField, PasswordConfirmField, PasswordField } from '@/components/form'
import { ConfirmButton } from '@/components/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'react-toastify'
import { useState } from 'react'
import EmailVerificationButton from './_components/email-verification'
import PolicyCheckbox from './_components/policy-checkbox'
import { useRegistrationContext } from './_components/registration-context'

export default function Step1({ setNextStep }: { setNextStep: (b: boolean) => void }) {
    const [isVerfied, setIsverfied] = useState(false)
    const [termCheck, setTermCheck] = useState(false)
    const { setStep1 } = useRegistrationContext()

    const formSchema = z
        .object({
            email: z.string().email({
                message: '이메일 주소가 올바르지 않습니다.',
            }),
            username: z
                .string()
                .min(2, {
                    message: '2글자 이상의 한글이어야 합니다.',
                })
                .regex(/^[가-힣]+$/, {
                    message: '한글만 입력 해주세요.',
                }),
            password: z
                .string()
                .min(8, {
                    message: '8글자 이상으로 입력해주세요.',
                })
                .max(15, { message: '15자 이내로 입력해주세요.' }),
            passwordConfirm: z
                .string()
                .min(8, {
                    message: '8글자 이상으로 입력해주세요.',
                })
                .max(15, { message: '15자 이내로 입력해주세요.' }),
        })
        .superRefine((data, ctx) => {
            if (data.password !== data.passwordConfirm) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: '비밀번호가 일치하지 않습니다.',
                    path: ['passwordConfirm'],
                })
            }
        })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        toast(JSON.stringify(data))
        setStep1(data)
        setNextStep(true)
    }

    const nextStepCondition = form.formState.isValid && termCheck && isVerfied

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                <div className="flex items-end w-full gap-3">
                    <div className="flex-auto">
                        <EmailField form={form} />
                    </div>
                    <EmailVerificationButton isVerfied={isVerfied} setIsverfied={setIsverfied} />
                </div>
                <UserNameField form={form} />
                <PasswordField form={form} />
                <PasswordConfirmField form={form} />
                <PolicyCheckbox setTermCheck={setTermCheck} />
                <ConfirmButton
                    type="submit"
                    className="w-full text-sm"
                    disabled={!nextStepCondition}
                >
                    배송지 입력하기
                </ConfirmButton>
            </form>
        </FormProvider>
    )
}