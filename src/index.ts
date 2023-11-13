import appInstance from "./app";
import Server from "./server";
import {basicConfigurationObject} from "./utils/constants";
const serverInstance = new Server(appInstance.app);

const PORT = (basicConfigurationObject.PORT_NUMBER) ? parseInt(basicConfigurationObject.PORT_NUMBER) : 3000;

serverInstance.start(PORT);
