import express from "express";
import bearerAuthenticationMiddleware from "./middlewares/jwt-authenticarion.middleware";
import errorHandler from "./middlewares/error-handler.middleware";
import authorizationRoute from "./routes/authorization.route";
import statusRoute from "./routes/status.route";
import usersRoute from "./routes/users.route";
import jwtAuthenticationMiddleware from "./middlewares/jwt-authenticarion.middleware";

const app = express();

//Configurações de aplicação
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Configurações de rotas
app.use(statusRoute);
app.use(authorizationRoute);


app.use(jwtAuthenticationMiddleware);
app.use(usersRoute);

//Configuração dos Handlers de Erro
app.use(errorHandler);

app.listen(3000,()=>{
    console.log("Aplicação iniciada em porta 3000");
})