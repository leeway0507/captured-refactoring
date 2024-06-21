'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'react-toastify'
import { ConfirmButton } from '@/components/button'
import { EmailField, PasswordField } from '@/components/form'

const FormSchema = z.object({
    email: z.string().email({
        message: '이메일 주소가 올바르지 않습니다.',
    }),
    password: z.string().min(8, {
        message: '8자 이상 비밀번호를 입력해주세요.',
    }),
})

export function Login() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        // TODO : 로그인 로직
        toast(JSON.stringify(data))
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                <EmailField form={form} />
                <PasswordField form={form} />
                <ConfirmButton type="submit" className="w-full">
                    로그인
                </ConfirmButton>
            </form>
        </FormProvider>
    )
}
