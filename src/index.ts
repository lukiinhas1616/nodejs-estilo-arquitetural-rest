import express from "express";
import errorHandler from "./middlewares/error-handler.middleware";
import authorizationRoute from "./routes/authorization.route";
import statusRoute from "./routes/status.route";
import usersRoute from "./routes/users.route";

const app = express();

//Configurações de aplicação
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Configurações de rotas
app.use(statusRoute);
app.use(usersRoute);
app.use(authorizationRoute);

//Configuração dos Handlers de Erro
app.use(errorHandler);

app.listen(3000,()=>{
    console.log("Aplicação iniciada em porta 3000");
})