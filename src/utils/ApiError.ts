export default class ApiError<T> extends Error {
    public readonly statusCode: number;
    public readonly data: T | null;
    public readonly success: boolean;
    public readonly errors: T[];

    constructor(
        statusCode: number,
        message: string = "Something went wrong",
        errors: T[] = [],
        data: T | null = null,
        stack?: string
    ) {
        super(message);
        this.statusCode = statusCode;
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
