import {Request,Response, NextFunction } from "express";
import DatabaseError from "../models/errors/database.error.model";
import ForbiddenError from "../models/errors/forbidden.error.model";

function errorHandler(e: any, req: Request, res: Response, next: NextFunction) {
    if (e instanceof DatabaseError) {
        res.sendStatus(400);
    } else if(e instanceof ForbiddenError){
        res.sendStatus(403);
    } else {
        res.sendStatus(500);
    }
}

export default errorHandler;