'use client'

import { Toggle } from '@/components/ui/toggle'
import { useEffect, useState } from 'react'

function ScrollComponent({
    defaultData,
    selectedData,
    updateData,
    unique = false,
}: {
    defaultData: string[]
    selectedData: string[]
    updateData: (v: string[]) => void
    unique?: boolean
}) {
    const [localData, setLocalData] = useState<string[]>(selectedData)
    const addUniqueItem = (v: string) => setLocalData([v])

    const addOrRemoveItem = (v: string) => {
        setLocalData((old) => {
            if (old.includes(v)) {
                return old.filter((item) => item !== v)
            }
            return [...old, v]
        })
    }

    const updateLocalData = unique ? addUniqueItem : addOrRemoveItem

    useEffect(() => {
        setLocalData(selectedData)
    }, [selectedData])

    useEffect(() => {
        // Update parent component's state only when localData changes
        if (JSON.stringify(localData) !== JSON.stringify(selectedData)) {
            updateData(localData)
        }
    }, [localData])
    return (
        <div className="flex flex-col max-h-48 overflow-auto z-50">
            {defaultData.map((v) => (
                <Toggle
                    key={v}
                    pressed={localData && localData.includes(v)}
                    onClick={() => updateLocalData(v)}
                    className="py-2"
                >
                    {v}
                </Toggle>
            ))}
        </div>
    )
}

export default ScrollComponent