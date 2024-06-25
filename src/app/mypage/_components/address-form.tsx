'use client'

import { FormField } from '@/components/form'
import { ConfirmButton } from '@/components/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/shadcn-ui/button'
import { usePostcode } from '@/hooks/interaction/search-address'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AddressFormProps } from '@/hooks/data/type'
import { updateAddrressAction, createAddrressAction, signUpAction } from '../_actions/action'

const FORM_TYPES = {
    update: { buttonText: '변경하기', submitFunction: updateAddrressAction },
    new: { buttonText: '등록하기', submitFunction: createAddrressAction },
    signUp: { buttonText: '가입하기', submitFunction: signUpAction },
}

const createFormSchema = () =>
    z.object({
        email: z.string(),
        krName: z.string(),
        password: z.string(),
        enName: z.string(),
        phone: z
            .string()
            .regex(/^\d+$/, '숫자만 입력 가능합니다.')
            .max(11, '올바른 번호를 입력해주세요.'),
        customId: z.string().length(13, '통관번호 13자리를 입력해주세요.'),
        krAddress: z.string(),
        krAddressDetail: z.string(),
        enAddress: z.string(),
        enAddressDetail: z.string(),
    })

export default function AddressForm({
    defaultValue,
    formType,
}: {
    defaultValue: Partial<AddressFormProps> | undefined
    formType: 'update' | 'new' | 'signUp'
}) {
    const { openAddressDialog, krAddress, enAddress } = usePostcode()

    const formSchema = createFormSchema()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: defaultValue,
    })

    const { buttonText, submitFunction } = FORM_TYPES[formType]

    useEffect(() => {
        if (krAddress) form.setValue('krAddress', krAddress)
        if (enAddress) form.setValue('enAddress', enAddress)
    }, [krAddress, enAddress])

    // prettier-ignore
    return (
        <form onSubmit={form.handleSubmit(submitFunction)} className="space-y-6 w-full">
            <div className="flex w-full gap-2">
                <FormField form={form} label="성명" formName="krName" type="text" />
                <FormField form={form} label="영문성명" formName="enName" type="text" />
            </div>
            <FormField form={form} label="휴대폰번호" formName="phone" type="text" />
            <FormField form={form} label="개인통관고유부호" formName="customId" type="text" />
            <div className=" flex-center text-sm bg-gray-100 rounded-md border px-5 py-3 mb-2 ">
                개인통관고유부호 불일치는 통관지연, 오배송의 원인이 됩니다.
            </div>
            <div className="flex items-end w-full gap-3">
                <FormField form={form} label="한글 도로명 주소" formName="krAddress" type="text" disabled />
                <Button className="text-xs" variant="secondary" type="button" onClick={openAddressDialog}>
                    도로명 주소 찾기
                </Button>
            </div>
            <FormField form={form} label="상세주소(동, 호수 입력)" formName="krAddressDetail" type="text"/>
            <div className="flex items-end w-full gap-3">
                <FormField form={form} label="영문 도로명 주소" formName="enAddress" type="text" disabled/>
                <Button className="text-xs" variant="secondary" type="button" onClick={openAddressDialog}>
                    도로명 주소 찾기
                </Button>
            </div>
            <FormField form={form} label="상세주소(동,호수 입력)" formName="enAddressDetail" type="text"/>
            <ConfirmButton type="submit" className="w-full" disabled={!form.formState.isValid}>
                {!form.formState.isValid ? '필수 항목을 입력해주세요.' : buttonText}
            </ConfirmButton>
        </form>
    )
}
