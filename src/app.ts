import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";

class App {
    public app: Express;
    constructor() {
        this.app = express();
        this.setupMiddleware();
    }
    private setupMiddleware(): void {
        this.app.use(helmet());
        this.app.use(
            cors({
                credentials: true,
                methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
                origin: process.env.CORS_ORIGIN?.split(","),
            })
        );
        this.app.use(
            express.json({
                limit: "16kb",
            })
        );
        this.app.use(
            express.urlencoded({
                extended: true,
                limit: "16kb",
            })
        );
        this.app.use(express.static("public"));
    }
}
const appInstance = new App();

export default appInstance;