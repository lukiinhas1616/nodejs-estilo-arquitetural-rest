import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import JWT from 'jsonwebtoken';
import userRepository from "../repositories/user.repository";

async function jwtAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {

        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader) {
            throw new ForbiddenError("Credenciais não informadas");
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if (authenticationType !== 'Bearer' || !token) {
            throw new ForbiddenError('Tipo de autenticação inválida');
        }

        try {
            const tokenPayload = JWT.verify(token, 'eleviisimaw123456789');
            if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
                throw new ForbiddenError('Token inválido');
            }

            const uuid = tokenPayload.sub;
            const email = tokenPayload.email
            const user = {
                uuid: uuid,
                email: email
            }
            req.user = user;
            next();

        } catch (error) {
            throw new ForbiddenError('Token inválido');
        }
    } catch (error) {
        next(error);
    }
}

export default jwtAuthenticationMiddleware;