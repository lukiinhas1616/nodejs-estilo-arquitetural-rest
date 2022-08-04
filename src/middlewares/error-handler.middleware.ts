import {Request,Response, NextFunction } from "express";
import DatabaseError from "../models/errors/database.error.model";

function errorHandler(e: any, req: Request, res: Response, next: NextFunction) {
    if (e instanceof DatabaseError) {
        res.sendStatus(400);
    } else {
        res.sendStatus(500);
    }
}

export default errorHandler;