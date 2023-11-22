import { Request, Response, NextFunction, RequestHandler } from "express";

const asyncHandler = (requestHandler: RequestHandler) => {
    console.log("async handler working");
    
    return (req: Request, res: Response, next: NextFunction) => {
        console.log("async handler", req.body);
        
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
};

export default asyncHandler;
