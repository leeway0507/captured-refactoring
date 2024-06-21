'use client'

import { CustomFormField, UserNameField } from '@/components/form'
import { ConfirmButton } from '@/components/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'react-toastify'
import { Button } from '@/components/shadcn-ui/button'
import { useEffect } from 'react'
import { usePostcode } from '@/hooks/interaction/search-address'
import { useRegistrationContext } from './_components/registration-context'

export default function Step2() {
    const { step1 } = useRegistrationContext()
    const { openAddressDialog, korAddress, engAddress } = usePostcode()

    const formSchema = z.object({
        email: z.string(),
        username: z.string(),
        password: z.string(),
        usernameEng: z.string(),
        phoneNumber: z
            .string()
            .regex(/^\d+$/, {
                message: '숫자만 입력 가능합니다.',
            })
            .max(11, { message: '올바른 번호를 입력해주세요.' }),
        customCode: z.string().length(13, { message: '통관번호 13자리를 입력해주세요.' }),
        korAddress: z.string(),
        engAddress: z.string(),
        korAddressDetail: z.string(),
        engAddressDetail: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            email: step1.email,
            username: step1.username,
            password: step1.password,
            korAddress,
            engAddress,
        },
    })

    useEffect(() => {
        if (korAddress) form.setValue('korAddress', korAddress)
        if (engAddress) form.setValue('engAddress', engAddress)
    }, [korAddress, engAddress])

    function onSubmit(data: z.infer<typeof formSchema>) {
        toast(JSON.stringify(data))
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                <div className="flex w-full gap-2">
                    <div className="flex-auto">
                        <UserNameField form={form} />
                    </div>
                    <div className="flex-auto">
                        <CustomFormField
                            form={form}
                            label="영문성명"
                            formName="usernameEng"
                            inputType="text"
                        />
                    </div>
                </div>
                <CustomFormField
                    form={form}
                    label="휴대폰번호"
                    formName="phoneNumber"
                    inputType="text"
                />
                <CustomFormField
                    form={form}
                    label="개인통관고유부호"
                    formName="customCode"
                    inputType="text"
                />
                <div className=" flex-center text-sm bg-gray-100 rounded-md border px-5 py-3 mb-2 ">
                    개인통관고유부호 불일치는 통관지연, 오배송의 원인이 됩니다.
                </div>
                <div className="flex items-end w-full gap-3">
                    <div className="flex-auto">
                        <CustomFormField
                            form={form}
                            label="한글 도로명 주소"
                            formName="korAddress"
                            inputType="text"
                            disabled
                        />
                    </div>
                    <Button
                        className="text-xs"
                        variant="secondary"
                        type="button"
                        onClick={openAddressDialog}
                    >
                        도로명 주소 찾기
                    </Button>
                </div>
                <CustomFormField
                    form={form}
                    label="상세주소(동,호수 입력)"
                    formName="korAddressDetail"
                    inputType="text"
                />
                <div className="flex items-end w-full gap-3">
                    <div className="flex-auto">
                        <CustomFormField
                            form={form}
                            label="영문 도로명 주소"
                            formName="engAddress"
                            inputType="text"
                            disabled
                        />
                    </div>
                    <Button
                        className="text-xs"
                        variant="secondary"
                        type="button"
                        onClick={openAddressDialog}
                    >
                        도로명 주소 찾기
                    </Button>
                </div>
                <CustomFormField
                    form={form}
                    label="상세주소(동,호수 입력)"
                    formName="engAddressDetail"
                    inputType="text"
                />
                <ConfirmButton type="submit" className="w-full" disabled={!form.formState.isValid}>
                    {!form.formState.isValid ? '필수 항목을 입력해주세요.' : '가입하기'}
                </ConfirmButton>
            </form>
        </FormProvider>
    )
}
