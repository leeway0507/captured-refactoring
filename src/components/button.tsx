'use client'

import React, { memo } from 'react'
import cn from '@/utils/cn'
import { Button, ButtonProps } from './shadcn-ui/button'

export function ConfirmButton(button: ButtonProps) {
    const { className, ...restItems } = button
    return <Button className={cn([className, 'rounded-full '])} {...restItems} />
}

export function CancelButton(button: ButtonProps) {
    const { className, ...restItems } = button
    return (
        <Button
            variant="outline"
            className={cn([className, 'rounded-full border-gray-300'])}
            {...restItems}
        />
    )
}

export interface ToggleStatusProps<T> {
    item: T
    status: 'selected' | 'init'
}

export const getToggleStatus = <T,>(
    itemArr: T[],
    selected: T | undefined,
): ToggleStatusProps<T>[] => {
    const getStatus = (item: T, selectedItem: T | undefined) =>
        item === selectedItem ? 'selected' : 'init'

    return itemArr.map((i) => ({ item: i, status: getStatus(i, selected) }))
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

export function ToggleButton<T extends React.ReactNode>({
    data,
    status,
    setSelected,
    icon,
}: {
    data: T
    status: 'selected' | 'disabled' | 'init'
    setSelected: (s: T) => void
    icon?: React.ReactNode
}) {
    const buttonDesign = {
        selected: 'default',
        disabled: 'default',
        init: 'outline',
    }

    return (
        <Button
            size="sm"
            disabled={status === 'disabled'}
            variant={buttonDesign[status] as 'default' | 'outline'}
            onClick={() => setSelected(data)}
            className="font-normal"
        >
            <span className="flex gap-1 items-center">
                {data} {icon}
            </span>
        </Button>
    )
}

type ToggleButtonTestProps<T> = {
    data: T
    isActive: boolean
    handleFilterClick: (d: T) => void
    Icon?: React.ReactNode
}

function ToggleButtonTestInner<T extends React.ReactNode>({
    data,
    isActive,
    handleFilterClick,
    Icon,
}: ToggleButtonTestProps<T>) {
    return (
        <Button
            type="button"
            onClick={() => handleFilterClick(data)}
            variant={`${isActive ? 'default' : 'outline'}`}
            className="font-normal"
        >
            <span className="flex gap-1 items-center">
                {data} {Icon}
            </span>
        </Button>
    )
}

export const ToggleButtonTest = memo(ToggleButtonTestInner) as typeof ToggleButtonTestInner
