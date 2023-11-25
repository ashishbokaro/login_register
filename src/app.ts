import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import userRouter from "./routes/users/user.route";
import logger from "./utils/logger";
import Database from "./configuration/dbConnection";
import {CommonErrorMessage} from "./utils/constants"
class App {
    public app: Express;

    constructor() {
        this.app = express();
        this.setupMiddleware();
        this.setRoutes();
    }

    private async setupMiddleware(): Promise<void> {
        try {
            this.app.use(helmet());
            this.app.use(express.static("public"));
            this.app.use(
                cors({
                    credentials: true,
                    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
                    origin: process.env.CORS_ORIGIN?.split(","),
                })
            );
                
            this.app.use(express.json({ limit: "16kb" }));
            this.app.use(express.urlencoded({ extended: true, limit: "16kb" }));
          
            this.app.use(morgan("combined"));
            await this.connectToDatabase();
            // Error handling middleware
            this.app.use(this.errorHandlerMiddleware);
        } catch (error) {
            console.error("Error setting up middleware:", error);
            process.exit(1);
        }
    }

    private async connectToDatabase(): Promise<void> {
        const db = new Database();

        try {
            await db.connect();
            console.log("Connected to the database");
        } catch (error) {
            console.error("Error connecting to the database:", error);
            throw error;
        }
    }

    private errorHandlerMiddleware(err: Error, req: Request, res: Response, next: NextFunction): void {
        logger.error("Error caught by error handling middleware:", err);
        res.status(500).send({ error: CommonErrorMessage.ERROR_MESSAGE_INTERNAL_SERVER_ERROR });
    }

    private setRoutes(): void {
        this.app.use("/api/v1/users", userRouter);
        this.app.get("*", (req: Request, res: Response) => {
            res.status(404).send({ error: CommonErrorMessage.ERROR_MESSAGE_NOT_FOUND });
        });

    }
}

const appInstance = new App();

export default appInstance;
