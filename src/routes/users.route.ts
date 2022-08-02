import { Router , Request, Response, NextFunction} from "express";

const usersRoute = Router();

usersRoute.get('/users',(req: Request,res: Response,next:NextFunction)=>{
    const users: never[] = [];
    res.json(users);
})

usersRoute.get('/users/:uuid',(req: Request<{uuid : String}>,res: Response,next:NextFunction)=>{
    const uuid = req.params.uuid;
    res.json({uuid});
})

usersRoute.post('/user',(req: Request,res: Response,next:NextFunction)=>{
    const user = req.body;
    res.json(user);
})

usersRoute.put('/user/:uuid',(req: Request<{uuid : String}>,res: Response,next:NextFunction)=>{
    const uuid = req.params.uuid;
    const user = req.body;

    user.nome = uuid;
    res.json(user);
})

usersRoute.delete('/user/:uuid',(req: Request<{uuid : String}>,res: Response,next:NextFunction)=>{
    res.sendStatus(200);
})

export default usersRoute;