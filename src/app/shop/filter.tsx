'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import {
    ButtonBox,
    ToggleButton,
    getToggleStatus,
    ConfirmButton,
    CancelButton,
} from '@/components/button'
import DropdownComponent from '@/components/dropdown'
import SlideComponent from '@/components/slider/slider'
import { useFilterParams, useCategoryType } from '@/hooks/data/product-filter'
import { useSearchParams } from 'next/navigation'
import { filterMetaData } from '../../data/metadata'

export function MobileCategoryNav() {
    const params = useSearchParams()
    const pageType = params.get('category')
    const customUnderLine = 'font-bold underline underline-offset-[5px] decoration-2'
    return (
        <nav className="flex md:hidden gap-5 px-3 w-full h-[25px] text-sm">
            <Link href="/shop" className={` ${!pageType && customUnderLine}`}>
                All
            </Link>
            <Link
                href="/shop?category=신발"
                className={`${pageType === '신발' && customUnderLine}`}
            >
                SHOES
            </Link>
            <Link
                href="/shop?category=의류"
                className={`${pageType === '의류' && customUnderLine}`}
            >
                CLOTHING
            </Link>
            <Link
                href="/shop?category=기타"
                className={`${pageType === '기타' && customUnderLine}`}
            >
                ACCESSORY
            </Link>
        </nav>
    )
}

export function FilterOptions({
    selectedFilterType,
    setSelectedFilterType,
}: {
    selectedFilterType: FilterType | undefined
    setSelectedFilterType: (s: FilterType | undefined) => void
}) {
    const { filterState, setFilterState, applyFilterToURL, resetFilterState } = useFilterParams()

    const categoryType = useCategoryType()

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
        종류: (
            <DropdownComponent
                key="종류"
                defaultData={filterMetaData['종류'][categoryType]}
                selectedData={filterState?.categorySpec || []}
                setSelectedData={(update: string[]) =>
                    setFilterState((old) => ({ ...old, categorySpec: update }))
                }
            />
        ),
        사이즈: (
            <DropdownComponent
                key="사이즈"
                defaultData={filterMetaData['사이즈'][categoryType]}
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
            <div className="py-2">{FilterComponent[selectedFilterType]}</div>
            <div className="flex gap-4 items-center justify-center pt-2">
                <ConfirmButton onClick={handleConfirm}>적용하기</ConfirmButton>
                <CancelButton onClick={handleCancel}>취소</CancelButton>
            </div>
        </div>
    )
}

type FilterType = '정렬순' | '브랜드' | '종류' | '사이즈' | '배송' | '가격'
const VALID_FILTER_TYPES: FilterType[] = ['정렬순', '브랜드', '종류', '사이즈', '배송', '가격']

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
        <div className="sticky top-[55px] py-3 px-2 w-full bg-white z-10">
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