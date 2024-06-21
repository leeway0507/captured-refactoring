import { UseFormReturn } from 'react-hook-form'
import { Input } from './shadcn-ui/input'

export function CustomFormField<T extends UseFormReturn<any>>({
    formName,
    inputType,
    label,
    form,
    disabled,
}: {
    formName: string
    inputType: string
    label: string
    form: T
    disabled?: boolean
}) {
    const error = form.formState.errors[formName]
    return (
        <div className="text-xs">
            <label htmlFor={formName}>
                <div className="flex items-center justify-between w-full gap-4">
                    <div className="pb-2">{label}</div>
                    <div className="text-red-500 text-xs">
                        {error && error?.message?.toString()}
                    </div>
                </div>
                <Input disabled={disabled} type={inputType} {...form.register(formName)} />
            </label>
        </div>
    )
}

export function EmailField<T extends UseFormReturn<any>>({ form }: { form: T }) {
    return <CustomFormField form={form} formName="email" label="이메일 주소" inputType="text" />
}

export function PasswordField<T extends UseFormReturn<any>>({ form }: { form: T }) {
    return <CustomFormField form={form} formName="password" label="비밀번호" inputType="password" />
}

export function PasswordConfirmField<T extends UseFormReturn<any>>({ form }: { form: T }) {
    return (
        <CustomFormField
            form={form}
            formName="passwordConfirm"
            label="비밀번호 확인"
            inputType="password"
        />
    )
}

export function UserNameField<T extends UseFormReturn<any>>({ form }: { form: T }) {
    return <CustomFormField form={form} formName="username" label="성 명" inputType="text" />
}
