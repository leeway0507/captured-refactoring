import NextAuth, { DefaultSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import KakaoProvider from 'next-auth/providers/kakao'
import NaverProvider from 'next-auth/providers/naver'

interface CustomUser {
    email: string
    name: string
    signUpType: string
}

// user Session Schema 재정의
declare module 'next-auth' {
    interface Session {
        user: CustomUser & DefaultSession['user']
    }
}

const transform = (res: { email: string; kr_name: string; sign_up_type: string }): CustomUser => ({
    email: res.email,
    name: res.kr_name,
    signUpType: res.sign_up_type,
})

export const signInByEmail = async (
    email: string,
    password: string,
): Promise<CustomUser | null> => {
    const params = new URLSearchParams()
    params.append('username', email)
    params.append('password', password)
    const res = await fetch(`${process.env.AUTH_API_URL}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params,
        cache: 'no-store',
    })

    if (res.status !== 200) {
        // If the status is not 200, the sign in failed
        return null
    }

    // Assuming the response JSON is the user object
    const user = await res.json()

    return transform(user)
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID!,
            clientSecret: process.env.KAKAO_CLIENT_SECRET!,
        }),
        NaverProvider({
            clientId: process.env.NAVER_CLIENT_ID!,
            clientSecret: process.env.NAVER_CLIENT_SECRET!,
        }),
        Credentials({
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            authorize: async (credentials) =>
                signInByEmail(credentials.email as string, credentials.password as string),
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
        async session({ session, token }) {
            // eslint-disable-next-line no-param-reassign
            session.user.name = token.name as string

            // eslint-disable-next-line no-param-reassign
            session.user.email = token.email as string
            // eslint-disable-next-line no-param-reassign
            session.user.signUpType = token.signUpType as string
            return session
        },
    },
    pages: {
        signIn: 'auth/signin',
    },
})
