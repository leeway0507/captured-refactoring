import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    buttonSize: 's' | 'm' | 'l' | 'xl'
}

export function ConfirmButton(buttonParam: ButtonProps) {
    const conFirmClass = 'black-bar-xl rounded-full my-1 lg:text-lg w-full my-4'
    const { children } = buttonParam
    return (
        <button type="button" className={`${conFirmClass}`} {...buttonParam}>
            {children}
        </button>
    )
}

export function CancelButton({ button }: { button: ButtonProps }) {
    const cancelClass = 'black-bar-xl rounded-full my-1 lg:text-lg w-full my-4'
    return (
        <button type="button" className={`${cancelClass}`} {...button}>
            {button.children}
        </button>
    )
}

export function ToggleButtonGrid({ children }: { children: React.ReactNode }) {
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
    const itemClass = 'flex-center text-sm w-full h-[35px] border rounded-full whitespace-nowrap px-1'
    const statusClasses = {
        selected: 'border-main-black border-2 cursor-pointer shadow-sm',
        disabled: 'border-gray-300 cursor-pointer text-gray-500 border-1',
        init: 'border-deep-gray cursor-not-allowed line-through decoration-[2px] text-deep-gray',
    }

    return (
        <button
            type="button"
            disabled={status === 'disabled'}
            className={`${itemClass} ${statusClasses[status]}`}
            onClick={() => setSelected(data)}
        >
            <span className="px-3">{data}</span>
        </button>
    )
}
