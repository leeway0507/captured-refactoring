'use client'

import ReactSlider from 'react-slider'
import './slider.css'
import { useEffect, useState } from 'react'
import { KRW } from '../../string-style/currency'

const oneItem =
    'bg-main-black border-main-black cursor-not-allowed text-light-gray active:text-main-black shadow-md'
const itemBoxClass =
    ' flex-center text-xs w-[100px] max-w-[200px] min-h-[30px] border-2 px-2 me-2 mb-2'

export default function SlideComponent({
    defaultData,
    selectedData,
    updateData,
}: {
    defaultData: number[]
    selectedData: number[] | string[]
    updateData: (v: number[]) => void
}) {
    const SelectedDataNumber = selectedData.map((d) => Number(d))
    const [localData, setlocalData] = useState<number[]>(SelectedDataNumber)

    useEffect(() => {
        if (JSON.stringify(localData) !== JSON.stringify(selectedData)) updateData(localData)
    }, [localData])

    if (selectedData.length !== 2) {
        if (selectedData.length === 1) {
            return (
                <div
                    className={`${oneItem} ${itemBoxClass}`}
                >{`₩${selectedData.toLocaleString()}`}</div>
            )
        }
        return null
    }

    return (
        <div className="px-3">
            <ReactSlider
                className="horizontal-slider"
                trackClassName="example-track"
                thumbClassName="example-thumb"
                defaultValue={defaultData || SelectedDataNumber}
                min={defaultData[0]}
                max={defaultData[1]}
                step={10000}
                onChange={(value) => setlocalData(value)}
            />
            <div className="grid grid-cols-5 text-center text-sm py-2">
                <div className="text-left col-span-2">{KRW(localData[0])}</div>
                <div className="text-center" />
                <div className="text-right col-span-2">{KRW(localData[1])}</div>
            </div>
        </div>
    )
}
