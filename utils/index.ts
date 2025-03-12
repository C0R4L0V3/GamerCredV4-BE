import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

type AsyncHandler<T = any> = (req: Request, res: Response, next: NextFunction) => Promise<T | void>;
type TransactionHandler<T = any> = (req: Request, res: Response, session: mongoose.ClientSession) => Promise<T>;

export function errorHandler<T = any>(fn: AsyncHandler<T>): AsyncHandler<T> {
    return async (req, res, next) => {
        try {
            let nextCalled = false;
            const result = await fn(req, res, (params?: any) => {
                nextCalled = true;
                next(params);
            });

            if (!res.headersSent && !nextCalled) {
                res.json(result);
            }
        } catch (e) {
            next(e);
        }
    };
}

export function withTransaction<T = any>(fn: TransactionHandler<T>): AsyncHandler<T> {
    return async (req, res, next) => {
        try {
            let result: T | undefined;
            await mongoose.connection.transaction(async (session) => {
                result = await fn(req, res, session);
            });

            if (result === undefined) {
                throw new Error("Transaction function must return a value");
            }

            return result;
        } catch (error) {
            next(error);
        }
    };
}
