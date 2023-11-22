import mongoose, { ConnectOptions } from "mongoose";
import {basicConfigurationObject} from "../utils/constants"
// interface CustomConnectOptions extends ConnectOptions {
//     useNewUrlParser?: boolean;
//     useUnifiedTopology?: boolean;
//   }
class Database {
    private readonly uri: string;

    constructor(uri: string = basicConfigurationObject.MONGODB_URI || "") {
        this.uri = uri;
        if(!this.uri){
            console.error("MONGODB_URI is missing");
            process.exit(1);
        }
    }

    async connect(): Promise<void> {
        try {
            // const options: CustomConnectOptions = {
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true,
            // };

            await mongoose.connect(this.uri);
            console.log("Connected to MongoDB");
        } catch (error) {
            console.error("MongoDB connection error:", error);
            process.exit(1);
        }
    }

    async disconnect(): Promise<void> {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
}

export default Database;
