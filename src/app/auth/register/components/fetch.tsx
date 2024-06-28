// import { userAddressProps, userProps } from '@/app/type'

// interface register {
//     userData: userProps
//     addressData: userAddressProps
// }

// export const registerProxy = async (props: register) => {
//     const { userData, addressData } = props

//     const dynamicUrl =
//         typeof window !== 'undefined' ? window.location.origin : 'http://127.0.0.1:3000'
//     const res = await fetch(`${dynamicUrl}/api/register`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ user_registration: userData, address: addressData }),
//     })

//     return res.json()
// }

// export const checkEmailDuplicationProxy = async (email: string) => {
//     const dynamicUrl =
//         typeof window !== 'undefined' ? window.location.origin : 'http://127.0.0.1:3000'
//     const res = await fetch(`${dynamicUrl}/api/email-check?email=${email}`)
//     return res.json()
// }

// export const verifyEmailCodeProxy = async (email: string, code: string) => {
//     const dynamicUrl =
//         typeof window !== 'undefined' ? window.location.origin : 'http://127.0.0.1:3000'
//     const res = await fetch(`${dynamicUrl}/api/verify-email-code?email=${email}&code=${code}`)
//     return res.json()
// }

// export const reSendCodeToEmailProxy = async (email: string) => {
//     const dynamicUrl =
//         typeof window !== 'undefined' ? window.location.origin : 'http://127.0.0.1:3000'
//     const res = await fetch(`${dynamicUrl}/api/resend-code-to-email?email=${email}`)
//     return res.json()
// }
