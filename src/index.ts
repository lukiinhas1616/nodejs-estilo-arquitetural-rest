import express from "express";
import statusRoute from "./routes/status.route";
import usersRoute from "./routes/users.route";

const app = express();

//Configurações de aplicação
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Configurações de rotas
app.use(statusRoute);
app.use(usersRoute);

app.listen(3000,()=>{
    console.log("Aplicação iniciada em porta 3000");
})