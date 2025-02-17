import {NextFunction,Request, Response} from 'express';

const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && "body" in err) {
         res.status(400).json({
            success: false,
            message: "Invalid JSON format",
            error: err.message, 
        });
        return;
    }
    next(err); 
};
const notFound=async (req: Request, res: Response) => {
        res.status(404).json({ message: 'Page Not Found' });
    };

const errorHandling = (err: Error, req: Request, res: Response): void => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
    return;
};

export {errorHandler, errorHandling ,notFound};
