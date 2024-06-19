'use client'

import { Toggle } from './shadcn-ui/toggle'

function DropdownComponent({
    defaultData,
    selectedData,
    setSelectedData,
    unique = false,
}: {
    defaultData: string[]
    selectedData: string[]
    setSelectedData: (v: string[]) => void
    unique?: boolean
}) {
    const addUniqueItem = (v: string) => {
        if (selectedData.includes(v)) {
            return setSelectedData([])
        }
        return setSelectedData([v])
    }

    const addMultipleItems = (v: string) => {
        if (selectedData.includes(v)) {
            return setSelectedData(selectedData.filter((item) => item !== v))
        }
        return setSelectedData([...selectedData, v])
    }

    const handleUpdate = unique ? addUniqueItem : addMultipleItems

    return (
        <div className="flex flex-col max-h-48 overflow-auto z-50">
            {defaultData.map((v) => (
                <Toggle
                    key={v}
                    pressed={selectedData && selectedData.includes(v)}
                    onClick={() => handleUpdate(v)}
                    className="py-2"
                >
                    {v}
                </Toggle>
            ))}
        </div>
    )
}

export default DropdownComponent

// prev
// function DropdownComponent({
//     defaultData,
//     selectedData,
//     setSelectedData,
//     unique = false,
// }: {
//     defaultData: string[]
//     selectedData: string[]
//     setSelectedData: (v: string[]) => void
//     unique?: boolean
// }) {
//     const [localData, setLocalData] = useState<string[]>(selectedData)
//     const addUniqueItem = (v: string) => setLocalData([v])

//     const addOrRemoveItem = (v: string) => {
//         setLocalData((old) => {
//             if (old.includes(v)) {
//                 return old.filter((item) => item !== v)
//             }
//             return [...old, v]
//         })
//     }

//     const updateLocalData = unique ? addUniqueItem : addOrRemoveItem

//     useEffect(() => {
//         // Update parent component's state only when localData changes
//         if (JSON.stringify(localData) !== JSON.stringify(selectedData)) {
//             setSelectedData(localData)
//         }
//     }, [localData])
//     return (
//         <div className="flex flex-col max-h-48 overflow-auto z-50">
//             {defaultData.map((v) => (
//                 <Toggle
//                     key={v}
//                     pressed={localData && localData.includes(v)}
//                     onClick={() => updateLocalData(v)}
//                     className="py-2"
//                 >
//                     {v}
//                 </Toggle>
//             ))}
//         </div>
//     )
// }

// export default DropdownComponent
