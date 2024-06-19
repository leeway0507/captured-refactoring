import { useRouter } from 'next/navigation' // Correct import path for useRouter
import { useState } from 'react'
import { Search } from 'lucide-react'

export default function SearchInputMain() {
    const [inputValue, setInputValue] = useState('') // Use state to manage the input value
    const router = useRouter()

    const onKeyDownHandler = (event: { key: string }) => {
        if (event.key === 'Enter' && inputValue) {
            router.push(`/search?q=${inputValue}`, { scroll: false })
        }
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value) // Update the state on input change
    }

    return (
        <div className="flex gap-2 items-center h-[50px] relative border-b">
            <Search className="text-gray-500" size="18px" />
            <input
                value={inputValue} // Bind the input value to the state
                onChange={onChangeHandler}
                className=" placeholder h-full text-sm text-gray-500 placeholder"
                onKeyDown={onKeyDownHandler}
            />
        </div>
    )
}
