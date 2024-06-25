'use client'

import Link from 'next/link'
import {
    User,
    ShoppingCart,
    Home,
    LucideBookMarked,
    CircleUser,
    Columns3,
    Search,
} from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import cn from '@/utils/cn'
import useElementHide from '@/hooks/interaction/element-hide'
import { Session } from 'next-auth'
import { useState } from 'react'
import Logo from './logo'

export function NavMobileCard({
    type,
    link,
}: {
    type: 'home' | 'cart' | 'brand' | 'shop' | 'mypage'
    link: string
}) {
    const params = usePathname()
    const icons = {
        home: <Home strokeWidth={params === link ? 2 : 1} />,
        brand: <LucideBookMarked strokeWidth={params === link ? 2 : 1} />,
        cart: <ShoppingCart strokeWidth={params === link ? 2 : 1} />,
        shop: <Columns3 strokeWidth={params === link ? 2 : 1} />,
        mypage: <CircleUser strokeWidth={params === link ? 2 : 1} />,
    }
    return (
        <Link href={link} className="flex-center flex-col">
            <div>{icons[type]}</div>
            <div className={cn('text-xs uppercase text-gray-500')}>{type}</div>
        </Link>
    )
}

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
                className=" placeholder h-full text-sm text-gray-500 placeholder focus:outline-none focus-visible:outline-0 "
                onKeyDown={onKeyDownHandler}
            />
        </div>
    )
}

function Icons({ userName }: { userName?: string }) {
    return (
        <div className="flex gap-4">
            <Link href="/mypage" className="flex-center gap-1 ">
                <div className="text-sm font-medium">{userName && userName.slice(1, 3)}</div>
                <User className="text-black" fill="black" size="28px" />
            </Link>
            <Link href="/cart">
                <ShoppingCart className="text-black" fill="black" size="28px" />
            </Link>
        </div>
    )
}

export function NavBottom({ session }: { session: Session | null }) {
    const elementHideRef = useElementHide(20, 40)
    const baseContainer =
        'grid grid-cols-5 text-center w-full bg-white px-16 max-w-[1440px] overflow-hidden mx-auto pt-4'
    const animation = 'duration-300 ease-in-out opacity-100 transform translate-y-0 relative'
    return (
        <div ref={elementHideRef} className={cn(baseContainer, animation)}>
            <div className="col-span-1 flex justify-start">
                <SearchInputMain />
            </div>
            <div className="col-span-3 flex-center">
                <Logo />
            </div>
            <div className="col-span-1 flex items-center justify-end">
                <Icons userName={session?.user.name} />
            </div>
        </div>
    )
}
