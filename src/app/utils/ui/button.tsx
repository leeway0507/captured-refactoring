import React from 'react'
import { Button, ButtonProps } from '@/components/ui/button'

export function ConfirmButton(button: ButtonProps) {
    return <Button {...button} />
}

export function CancleButton(button: ButtonProps) {
    return <Button variant="outline" {...button} />
}

export function ButtonBox({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="gap-2 grid grid-flow-dense"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(70px, auto))' }}
        >
            {children}
        </div>
    )
}

export function ToggleButton({
    data,
    status,
    setSelected,
}: {
    data: string
    status: 'selected' | 'disabled' | 'init'
    setSelected: (s: string) => void
}) {
    // const itemClass = 'flex-center text-sm w-full h-[35px] border rounded-full whitespace-nowrap px-1'
    // const statusClasses = {
    //     selected: 'border-main-black border-2 cursor-pointer shadow-sm',
    //     disabled: 'border-gray-300 cursor-pointer text-gray-500 border-1',
    //     init: 'border-deep-gray cursor-not-allowed line-through decoration-[2px] text-deep-gray',
    // }
    const variants = {
        selected: 'default',
        disabled: 'default',
        init: 'outline',
    }

    return (
        <Button
            size="sm"
            disabled={status === 'disabled'}
            variant={variants[status] as 'default' | 'outline'}
            onClick={() => setSelected(data)}
        >
            <span className="px-3">{data}</span>
        </Button>
    )
}
