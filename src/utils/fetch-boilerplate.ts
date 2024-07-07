import { logError } from './log-error'
import { CustomError } from './custom-error'

interface ErrorCaseProps {
    [key: number]: string
}

const ERROR_CASE = {
    401: '권한이 없습니다.',
    404: '일치하는 정보가 없습니다.',
    500: '요청에 실패했습니다.',
}

const ACCEPT_CODE = [200, 201, 202, 303, 307]

export const handleFetchError = async <T>(
    fetchFn: () => Promise<{ status: number; data: T }>,
    errorCase?: ErrorCaseProps, // Assuming you want to pass status and data to errorCase
    customAcceptCode?: Array<number>,
): Promise<T> => {
    try {
        const resp = await fetchFn()
        const acceptCode = new Set([...ACCEPT_CODE, ...(customAcceptCode || [])])
        if (acceptCode.has(resp.status)) return resp.data
        throw new CustomError('', resp.status, resp.data)
    } catch (error) {
        const err = error as CustomError
        const message = { ...ERROR_CASE, ...errorCase }[err.status] || JSON.stringify(err.data)
        logError(`message : ${message} \n fetchFn : ${fetchFn.toString()} `)

        err.message = message
        throw err
    }
}

export const fetchWithAuth = async <T>(
    url: string,
    method: string,
    accessToken: string,
    body?: any,
): Promise<{ status: number; data: T }> => {
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: body ? JSON.stringify(body) : undefined,
    }

    const response = await fetch(url, options)
    const data = await response.json()
    return data.status ? data : { status: response.status, data }
}
