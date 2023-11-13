import { Express } from "express";

export default class server {
    private app: Express;
    constructor(app: Express) {
        this.app = app;
    }
    public start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}
