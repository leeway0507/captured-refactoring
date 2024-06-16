'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import {
    ButtonBox,
    ToggleButton,
    getToggleStatus,
    ConfirmButton,
    CancelButton,
} from '../utils/ui/button'
import { filterMetaData } from '../static/metadata'
import DropdownComponent from '../utils/ui/dropdown'
import SlideComponent from '../utils/ui/slider/slider'
import { useFilterParams, usePageType } from '../utils/hooks/data/product-filter'

export function FilterOptions({
    selectedFilterType,
    setSelectedFilterType,
}: {
    selectedFilterType: FilterType | undefined
    setSelectedFilterType: (s: FilterType | undefined) => void
}) {
    const { filterState, setFilterState, applyFilterToURL, resetFilterState } = useFilterParams()

    const pageType = usePageType()

    const handleConfirm = () => {
        applyFilterToURL()
        setSelectedFilterType(undefined)
    }
    const handleCancel = () => {
        resetFilterState()
        setSelectedFilterType(undefined)
    }

    const FilterComponent: Record<FilterType, JSX.Element> = {
        정렬순: (
            <DropdownComponent
                key="정렬순"
                defaultData={filterMetaData['정렬순']}
                selectedData={filterState?.sortBy || []}
                setSelectedData={(update: string[]) =>
                    setFilterState((old) => ({ ...old, sortBy: update }))
                }
                unique
            />
        ),
        브랜드: (
            <DropdownComponent
                key="브랜드"
                defaultData={filterMetaData['브랜드']}
                selectedData={filterState?.brand || []}
                setSelectedData={(update: string[]) =>
                    setFilterState((old) => ({ ...old, brand: update }))
                }
            />
        ),
        제품종류: (
            <DropdownComponent
                key="제품종류"
                defaultData={filterMetaData['제품종류'][pageType]}
                selectedData={filterState?.category || []}
                setSelectedData={(update: string[]) =>
                    setFilterState((old) => ({ ...old, category: update }))
                }
            />
        ),
        사이즈: (
            <DropdownComponent
                key="사이즈"
                defaultData={filterMetaData['사이즈'][pageType]}
                selectedData={filterState?.size || []}
                setSelectedData={(update: string[]) =>
                    setFilterState((old) => ({ ...old, size: update }))
                }
            />
        ),
        배송: (
            <DropdownComponent
                key="배송"
                defaultData={filterMetaData['배송']}
                selectedData={filterState?.delivery || []}
                setSelectedData={(update: string[]) =>
                    setFilterState((old) => ({ ...old, delivery: update }))
                }
            />
        ),
        가격: (
            <SlideComponent
                key="가격"
                defaultData={filterMetaData['가격']}
                selectedData={filterState?.price || []}
                setSelectedData={(update: number[]) =>
                    setFilterState((old) => ({ ...old, price: update.map((v) => String(v)) }))
                }
            />
        ),
    }

    if (!selectedFilterType) return null
    return (
        <div className="absolute top-12 z-20 w-full bg-white pb-4">
            <div>{FilterComponent[selectedFilterType]}</div>
            <div className="flex gap-4 items-center justify-center pt-8">
                <ConfirmButton onClick={handleConfirm}>적용하기</ConfirmButton>
                <CancelButton onClick={handleCancel}>취소</CancelButton>
            </div>
        </div>
    )
}

type FilterType = '정렬순' | '브랜드' | '제품종류' | '사이즈' | '배송' | '가격'
const VALID_FILTER_TYPES: FilterType[] = ['정렬순', '브랜드', '제품종류', '사이즈', '배송', '가격']

export default function Filter() {
    const [selectedFilterType, setSelectedFilterType] = useState<FilterType>()
    const filterStatus = getToggleStatus<FilterType>(VALID_FILTER_TYPES, selectedFilterType)

    const addOrRemoveItem = (v: FilterType | undefined) => {
        setSelectedFilterType((old) => {
            if (old === v) return undefined
            return v
        })
    }
    return (
        <div className="py-2 fixed top-0 z-50 w-full bg-white">
            <ButtonBox>
                {filterStatus.map((f) => (
                    <ToggleButton<FilterType>
                        key={f.item}
                        data={f.item}
                        status={f.status}
                        setSelected={addOrRemoveItem}
                        icon={<ChevronDown size="15px" />}
                    />
                ))}
            </ButtonBox>
            <FilterOptions
                selectedFilterType={selectedFilterType}
                setSelectedFilterType={addOrRemoveItem}
            />
        </div>
    )
}
