'use client'

import cn from '@/utils/cn'
import { Button } from '@/components/shadcn-ui/button'
import { signOutAction } from '../../auth/_actions/action'

export function LogoutButton() {
    const handleSignOut = async () => {
        const res = confirm('로그아웃 하시겠습니까?')
        if (res) return signOutAction()
        return null
    }
    const triggerClass = cn(
        'w-full flex-center whitespace-nowrap text-sm h-7',
        'md:px-8 lg:px-12 md:h-12 md:rounded md:tracking-wider md:text-lg',
    )
    return (
        <Button variant='link' className={`${triggerClass}`} onClick={handleSignOut}>
            로그아웃
        </Button>
    )
}
