import { NextFunction, Request, Response, Router } from "express";
import JWT from "jsonwebtoken";
import basicAuthenticationMiddleware from "../middlewares/basic-authentication.middleware";
import ForbiddenError from "../models/errors/forbidden.error.model";


const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {

    try {
        const user = req.user;

        if(!user){
            throw new ForbiddenError('Usuário não informado');
        }

        const jwtPayload = { email: user.email };
        const jwtOptions = { subject: user.uuid };
        const jwt = JWT.sign(jwtPayload, 'eleviisimaw123456789', jwtOptions);
        res.status(200).json({ token: jwt });

    } catch (e) {
        next(e);
    }
});

export default authorizationRoute;