import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";

async function basicAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {

        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader) {
            throw new ForbiddenError('Acesso não autorizado');
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if (authenticationType !== 'Basic' || !token) {
            throw new ForbiddenError('Modo autenticação inválida');
        }

        const tokenContent = Buffer.from(token, 'base64').toString('utf-8');

        const [email, password] = tokenContent.split(':');

        if (!email || !password) {
            throw new ForbiddenError('Credenciais não informadas');
        }

        const user = await userRepository.findByEmailAndPassword(email, password);
        if (!user) {
            throw new ForbiddenError("Usuário ou senha inválidos");
        }

        req.user = user;
        next();
    } catch (e) {
        next(e);
    }
}

export default basicAuthenticationMiddleware;