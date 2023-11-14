import mongoose, { ConnectOptions } from "mongoose";
interface CustomConnectOptions extends ConnectOptions {
    useNewUrlParser?: boolean;
    useUnifiedTopology?: boolean;
  }
class Database {
    private readonly uri: string;

    constructor(uri: string) {
        this.uri = uri;
    }

    async connect(): Promise<void> {
        try {
            const options: CustomConnectOptions = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            };

            await mongoose.connect(this.uri, options);
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

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("MONGODB_URI is missing");
    process.exit(1);
}
const db = new Database(MONGODB_URI);

export default db
