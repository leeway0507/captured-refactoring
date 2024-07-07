export class CustomError extends Error {
    status: number
    data: any
    constructor(message: string, status: number, data: any) {
        super(message)
        this.name = 'CustomError'
        this.status = status
        this.data = data

        // Ensure the name of this error is the same as the class name
        this.name = this.constructor.name
        // Capture the stack trace, excluding the constructor call from it
        Error.captureStackTrace(this, this.constructor)
    }
}
