import { Express } from "express";

export default class server {
    private app: Express;
    constructor(app: Express) {
        this.app = app;
        process
            .on("SIGINT", () => this.onSignalInterruptedHandler())
            .on("unhandledRejection", (reason, p) => this.onUnhandledRejection(reason as Error, p))
            .on("uncaughtException", (err) => this.onUncaughtException(err));
    }
    public start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    private onSignalInterruptedHandler(): void {
        console.log("SIGINT signal received. Shutting down gracefully.");
        // Implement graceful shutdown logic here if needed
        process.exit(0);
    }

    private onUnhandledRejection(reason: Error, p: Promise<any>): void {
        console.error("Unhandled Rejection at Promise", p, "\nReason:", reason);
        // Optionally, log the error or take other actions
    }

    private onUncaughtException(err: Error): void {
        console.error((new Date()).toUTCString() + " uncaughtException:", err.message);
        console.error(err.stack);
        process.exit(1);
    }
}
