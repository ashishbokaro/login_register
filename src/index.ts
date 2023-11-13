import appInstance from "./app";
import Server from "./server";
import dotenv from "dotenv";
dotenv.config();
const serverInstance = new Server(appInstance.app);

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

serverInstance.start(PORT);
