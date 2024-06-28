'use client'

import { useState } from 'react'
import { z } from 'zod'

import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { UserNameField, EmailField, PasswordConfirmField, PasswordField } from '@/components/form'
import { ConfirmButton } from '@/components/button'
import { fetchResetPassword, getTokenByEmailAndName } from '@/hooks/data/auth-fetch'

interface ResetDataProps {
    accessToken: string
    email: string
}

export function VerificateEmail({ setResetData }: { setResetData: (d: ResetDataProps) => void }) {
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

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        await getTokenByEmailAndName(data.email, data.username)
            .then((r) => setResetData({ accessToken: r.token, email: form.getValues().email }))
            .then(() => toast('인증에 성공했습니다.'))
            .catch((r) => toast.error(r.message))
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

export function ResetPassword({
    resetData,
    redirectTo,
}: {
    resetData: ResetDataProps
    redirectTo: string
}) {
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
            email: resetData.email,
        },
        mode: 'onChange',
    })
    const router = useRouter()
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        await fetchResetPassword(resetData.accessToken, data.password)
            .then(() => toast('비밀번호를 변경했습니다.'))
            .then(() => router.push(redirectTo))
            .catch((r) => toast(r.message))
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
    const [resetData, setResetData] = useState<ResetDataProps>()

    return !resetData ? (
        <VerificateEmail setResetData={setResetData} />
    ) : (
        <ResetPassword resetData={resetData} redirectTo="/auth/signin" />
    )
}
