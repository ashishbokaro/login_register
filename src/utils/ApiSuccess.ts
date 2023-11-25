class ApiResponse<T> {
    public statusCode: number;
    public successCode:number;
    public data: T;
    public message: string;
    public success: boolean;

    constructor(statusCode: number, successCode:number, data: T, message = "Success") {
        this.statusCode = statusCode;
        this.successCode = successCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

export default ApiResponse