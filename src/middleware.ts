import { auth } from '@/auth'

// eslint-disable-next-line consistent-return
export default auth((req) => {
    if (!req.auth) {
        const urlOrigin = req.nextUrl.origin
        const newUrl = new URL('auth/signin', urlOrigin)
        newUrl.searchParams.set('redirectTo', req.nextUrl.href.replace(urlOrigin, ''))
        return Response.redirect(newUrl)
    }
})

export const config = {
    matcher: ['/mypage', '/order'],
}
