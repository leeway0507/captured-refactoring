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
import React from 'react'
import { usePathname } from 'next/navigation'
import cn from '@/utils/cn'
import useElementHide from '@/hooks/interaction/element-hide'
import Logo from './logo'
import SearchInputMain from './search'

function NavMobileCard({
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

function NavMobileBottom() {
    return (
        <nav className="tb:hidden fixed bottom-0 z-50 grid grid-cols-5 w-full border bg-white py-3">
            <NavMobileCard type="home" link="/" />
            <NavMobileCard type="brand" link="/brand" />
            <NavMobileCard type="shop" link="/shop" />
            <NavMobileCard type="cart" link="/cart" />
            <NavMobileCard type="mypage" link="/auth/signin" />
        </nav>
    )
}

function NavMobileTop({ hideMobileBottom }: { hideMobileBottom: boolean }) {
    return (
        <div className="fixed top-0 flex items-center justify-between w-full p-3 z-50 bg-white">
            <Logo />
            <div className="flex gap-4">
                {hideMobileBottom && (
                    <Link href="/cart">
                        <ShoppingCart strokeWidth={2} size="24px" />
                    </Link>
                )}
                <Link href="/search" className="">
                    <Search size="24px" />
                </Link>
            </div>
        </div>
    )
}

export function NavMobile({ hideMobileBottom }: { hideMobileBottom?: boolean }) {
    return (
        <div className="md:hidden block">
            <NavMobileTop hideMobileBottom={hideMobileBottom || false} />
            {!hideMobileBottom && <NavMobileBottom />}
        </div>
    )
}

function NavTop() {
    return (
        <nav className="flex items-center justify-around max-w-2xl mx-auto text-lg py-1 w-full">
            <Link href="/brand" className="basis-1/5 flex-center">
                brand
            </Link>
            <Link href="/shop" className="basis-1/5 flex-center">
                latest
            </Link>
            <Link href="/shop?category=신발" className="basis-1/5 flex-center">
                shoes
            </Link>
            <Link href="/shop?category=의류" className="basis-1/5 flex-center">
                clothing
            </Link>
            <Link href="/shop?category=기타" className="basis-1/5 flex-center">
                accessory
            </Link>
        </nav>
    )
}

function Icons() {
    return (
        <div className="flex gap-4">
            <Link href="/mypage">
                <User className="text-black" fill="black" size="28px" />
            </Link>
            <Link href="/cart">
                <ShoppingCart className="text-black" fill="black" size="28px" />
            </Link>
        </div>
    )
}

function NavBottom({ reference }: { reference: any }) {
    const baseContainer =
        'grid grid-cols-5 text-center w-full bg-white px-16 max-w-[1440px] overflow-hidden mx-auto pt-4'
    const animation = 'duration-300 ease-in-out opacity-100 transform translate-y-0 relative'
    return (
        <div ref={reference} className={cn(baseContainer, animation)}>
            <div className="col-span-1 flex justify-start">
                <SearchInputMain />
            </div>
            <div className="col-span-3 flex-center">
                <Logo />
            </div>
            <div className="col-span-1 flex items-center justify-end">
                <Icons />
            </div>
        </div>
    )
}

function NavPc() {
    const ref = useElementHide(20, 40)
    return (
        <div className="hidden md:block fixed bg-white top-0 w-full py-2 z-50 shadow-md">
            <NavTop />
            <NavBottom reference={ref} />
        </div>
    )
}

function Nav({ hideMobileBottom }: { hideMobileBottom?: boolean }) {
    return (
        <>
            <NavMobile hideMobileBottom={hideMobileBottom} />
            <NavPc />
        </>
    )
}

export default Nav
