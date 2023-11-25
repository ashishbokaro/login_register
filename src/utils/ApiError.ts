export default class ApiError<T> extends Error {
    public readonly statusCode: number;
    public readonly data: T | null;
    public readonly success: boolean;
    public readonly errors: T[];
    public readonly errorCode: number; // Add errorCode property

    constructor(
        statusCode: number,
        errorCode: number, // Pass errorCode to the constructor
        message: string = "Something went wrong",
        errors: T[] = [],
        data: T | null = null,
        stack?: string
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode; // Set the errorCode property
        this.data = data;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
