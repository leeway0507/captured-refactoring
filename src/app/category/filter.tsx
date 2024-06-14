'use client'

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { ProductFilterParamsProps } from '../utils/hooks/data/type'
import {
    ButtonBox,
    ToggleButton,
    getToggleStatus,
    ConfirmButton,
    CancelButton,
} from '../utils/ui/button'
import { filterMetaData } from '../static/metadata'
import ScrollComponent from '../utils/ui/scroll-area'
import SlideComponent from '../utils/ui/slider/slider'

export const updateFilterParams = (
    filterParams: ProductFilterParamsProps,
    router: AppRouterInstance,
) => {
    const urlWithoutSearchParams = window.location.href.split('?')[0]
    const newURL = new URL(urlWithoutSearchParams)

    // update SearchParams
    Object.entries(filterParams).map(([k, v]) => newURL.searchParams.set(k, v.join()))
    router.push(newURL.href, { scroll: false })
}

export const getFilterParams = (): ProductFilterParamsProps => {
    const url = new URL(window.location.href)
    const { searchParams } = url

    searchParams.delete('page')

    // Use reduce to convert the search parameters into an object
    const filterParams = Array.from(searchParams.entries()).reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value.split(',') }),
        {},
    )
    return filterParams
}

const useFilterParams = () => {
    const router = useRouter()
    const [filterParams, setFilterParams] = useState<ProductFilterParamsProps>()
    const [filterSaved, setFilterSaved] = useState<ProductFilterParamsProps>()

    useEffect(() => {
        const urlFilter = getFilterParams()
        setFilterParams(urlFilter)
        setFilterSaved(urlFilter)
    }, [])

    const updateFilter = () => {
        if (filterParams) updateFilterParams(filterParams, router)
    }
    const updatePrev = () => {
        if (filterParams) setFilterParams(filterSaved)
    }
    return { filterParams, setFilterParams, updateFilter, updatePrev }
}

type PageType = '의류' | '신발' | '전체' | '기타'
const VALID_PAGE_TYPES: PageType[] = ['의류', '신발', '전체', '기타']

const isPageType = (pageType: string): pageType is PageType =>
    VALID_PAGE_TYPES.includes(pageType as PageType)

const usePageType = (): PageType => {
    const searchParams = useSearchParams()
    const pageType = searchParams.get('pageType')

    return pageType && isPageType(pageType) ? (pageType as PageType) : '전체'
}

export function FilterOptions({
    selectedFilterName,
    setSelectedFilterName,
}: {
    selectedFilterName: FilterType | undefined
    setSelectedFilterName: (s: FilterType | undefined) => void
}) {
    const { filterParams, setFilterParams, updateFilter, updatePrev } = useFilterParams()

    const pageType = usePageType()

    const handleConfirm = () => {
        updateFilter()
        setSelectedFilterName(undefined)
    }
    const handleCancel = () => {
        updatePrev()
        setSelectedFilterName(undefined)
    }

    const FilterComponent = {
        정렬순: (
            <ScrollComponent
                defaultData={filterMetaData['정렬순']}
                selectedData={filterParams?.sortBy || []}
                updateData={(update: string[]) =>
                    setFilterParams((old) => ({ ...old, sortBy: update }))
                }
                unique
            />
        ),
        브랜드: (
            <ScrollComponent
                defaultData={filterMetaData['브랜드']}
                selectedData={filterParams?.brand || []}
                updateData={(update: string[]) =>
                    setFilterParams((old) => ({ ...old, brand: update }))
                }
            />
        ),
        제품종류: (
            <ScrollComponent
                defaultData={filterMetaData['제품종류'][pageType]}
                selectedData={filterParams?.category || []}
                updateData={(update: string[]) =>
                    setFilterParams((old) => ({ ...old, category: update }))
                }
            />
        ),
        사이즈: (
            <ScrollComponent
                defaultData={filterMetaData['사이즈'][pageType]}
                selectedData={filterParams?.size || []}
                updateData={(update: string[]) =>
                    setFilterParams((old) => ({ ...old, size: update }))
                }
            />
        ),
        배송: (
            <ScrollComponent
                defaultData={filterMetaData['배송']}
                selectedData={filterParams?.delivery || []}
                updateData={(update: string[]) =>
                    setFilterParams((old) => ({ ...old, delivery: update }))
                }
            />
        ),
        가격: (
            <SlideComponent
                defaultData={filterMetaData['가격']}
                selectedData={filterParams?.price || []}
                updateData={(update: number[]) =>
                    setFilterParams((old) => ({ ...old, price: update.map((v) => String(v)) }))
                }
            />
        ),
    }

    if (!selectedFilterName) return null
    return (
        // TODO: absolute가 되도록 조치
        <div>
            <div>{FilterComponent[selectedFilterName]}</div>
            <div className="flex gap-2">
                <ConfirmButton onClick={handleConfirm}>적용하기</ConfirmButton>
                <CancelButton onClick={handleCancel}>취소</CancelButton>
            </div>
        </div>
    )
}

type FilterType = '정렬순' | '브랜드' | '제품종류' | '사이즈' | '배송' | '가격'

export default function Filter() {
    const [selectedFilterName, setSelectedFilterName] = useState<FilterType>()
    const VALID_FILTER_TYPES: FilterType[] = [
        '정렬순',
        '브랜드',
        '제품종류',
        '사이즈',
        '배송',
        '가격',
    ]
    const filterStatus = getToggleStatus<FilterType>(VALID_FILTER_TYPES, selectedFilterName)

    const addOrRemoveItem = (v: FilterType | undefined) => {
        setSelectedFilterName((old) => {
            if (old === v) return undefined
            return v
        })
    }
    return (
        <>
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
                selectedFilterName={selectedFilterName}
                setSelectedFilterName={addOrRemoveItem}
            />
        </>
    )
}
