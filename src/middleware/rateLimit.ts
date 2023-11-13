import { Request, Response, NextFunction } from "express";
import {CommonErrorMessage, statusCodeObject} from "../utils/constants";

class RateLimiter {
    private rateLimitMap: Map<string, { count: number; lastAccess: number }> = new Map();
  
    private isRateLimitExceeded(entry: { count: number; lastAccess: number }): boolean {
        return entry.count > 100;
    }
  
    private cleanupRateLimitMap(): void {
        const now = Date.now();

        this.rateLimitMap.forEach((entry, ip) => {
            if (now - entry.lastAccess > 1 * 60 * 1000) {
                this.rateLimitMap.delete(ip);
            }
        });
    }
  
    public middleware(req: Request, res: Response, next: NextFunction): void {
        const clientIP: string | undefined = req.ip;

        if (!clientIP) {
            // Handle the case where clientIP is undefined (e.g., if req.ip is not available)
            res.status(statusCodeObject.HTTP_STATUS_BAD_REQUEST).send(CommonErrorMessage.ERROR_MESSAGE_BAD_REQUEST);

            return; 
        }
        if (!this.rateLimitMap.has(clientIP)) {
            this.rateLimitMap.set(clientIP, { count: 1, lastAccess: Date.now() });
        } else {
            const entry = this.rateLimitMap.get(clientIP)!;

            entry.count += 1;
            entry.lastAccess = Date.now();
  
            if (this.isRateLimitExceeded(entry)) {
                res.status(statusCodeObject.HTTP_STATUS_TOO_MANY_REQUESTS).send(CommonErrorMessage.ERROR_MESSAGE_TOO_MANY_REQUESTS);

                return;
            }
        }
  
        this.cleanupRateLimitMap();
  
        next();
    }
}

const rateLimiter = new RateLimiter();

export default rateLimiter;