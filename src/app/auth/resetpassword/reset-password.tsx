'use client'

import { UserNameField, EmailField, PasswordConfirmField, PasswordField } from '@/components/form'
import { ConfirmButton } from '@/components/button'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { toast } from 'react-toastify'
import { useState } from 'react'

export function VerificateEmail({ setVerifiedEmail }: { setVerifiedEmail: (b: string) => void }) {
    const FormSchema = z.object({
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
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        mode: 'onChange',
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast(JSON.stringify(data))
        setVerifiedEmail(form.getValues().email)
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
            <EmailField form={form} />
            <UserNameField form={form} />
            <ConfirmButton type="submit" className="w-full">
                이메일 확인
            </ConfirmButton>
        </form>
    )
}

export function ResetPassword({ verifiedEmail }: { verifiedEmail: string }) {
    const FormSchema = z
        .object({
            email: z.string(),
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
        .superRefine(({ passwordConfirm, password }, ctx) => {
            if (passwordConfirm !== password) {
                ctx.addIssue({
                    code: 'custom',
                    message: '비밀번호가 일치하지 않습니다.',
                    path: ['passwordConfirm'],
                })
            }
        })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: verifiedEmail,
        },
        mode: 'onChange',
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
        toast(JSON.stringify(data))
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
            <PasswordField form={form} />
            <PasswordConfirmField form={form} />
            <ConfirmButton type="submit" className="w-full">
                변경하기
            </ConfirmButton>
        </form>
    )
}

export function ResetPasswordForm() {
    const [verifiedEmail, setVerifiedEmail] = useState<string>()

    return !verifiedEmail ? (
        <VerificateEmail setVerifiedEmail={setVerifiedEmail} />
    ) : (
        <ResetPassword verifiedEmail={verifiedEmail} />
    )
}
