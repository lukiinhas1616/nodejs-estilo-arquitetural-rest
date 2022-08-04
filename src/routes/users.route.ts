import { Router, Request, Response, NextFunction } from "express";
import DatabaseError from "../models/errors/database.error.model";
import userRepository from "../repositories/user.repository";

const usersRoute = Router();

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();
    res.json(users);
})

usersRoute.get('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
        const uuid = req.params.uuid;
        const user = await userRepository.findById(uuid);
        res.json(user);
    } catch (e) {
        next(e);
    }
})

usersRoute.post('/user', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body;
        const uuid = await userRepository.create(user);
        res.json(uuid);
    } catch (e){
        next(e);
    }
})

usersRoute.put('/user/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {

    try {
        const uuid = req.params.uuid;
        const user = req.body;
        user.uuid = uuid;
        await userRepository.update(user);
        res.json({ resposta: "Alterado com sucesso" });
    } catch (e) {
        next(e);
    }
})

usersRoute.delete('/user/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
        const uuid = req.params.uuid;
        await userRepository.remove(uuid);
        res.json({ resposta: "Deletado com sucesso" });
    } catch (e) {
        next(e);
    }
})

export default usersRoute;