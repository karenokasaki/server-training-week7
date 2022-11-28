import express from "express";
import * as dotenv from "dotenv";
import userRoute from "./routes/user.routes.js";

//habilitando a aplicação a ter variáveis de ambiente
dotenv.config();
//como acessar as variáveis de ambiente:
console.log(process.env.PORT);

//instanciando a variável que será responsável pelo nosso servidor: app
const app = express();

//configurar nosso servidor para que ele possa receber e enviar arquivos em json
app.use(express.json());

app.use("/user", userRoute);

app.listen(process.env.PORT, () => {
  console.log(
    `App up and running on port: http://localhost:${process.env.PORT}`
  );
});
