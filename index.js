import express from "express";
import * as dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

//habilitando a aplicação a ter variáveis de ambiente
dotenv.config();
//como acessar as variáveis de ambiente:
console.log(process.env.PORT);

//instanciando a variável que será responsável pelo nosso servidor: app
const app = express();

//configurar nosso servidor para que ele possa receber e enviar arquivos em json
app.use(express.json());

//banco de dados que usaremos de exemplo
const db = [
  {
    id: "e27ab2b1-cb91-4b18-ab90-5895cc9abd29",
    documentName: "Licitação Enap - Curso Web Dev",
    status: "Em andamento",
    details:
      "Processo para capacitação de servidores públicos em desenvolvimento de aplicações na WEB. Parceria com Ironhack",
    dateInit: "28/11/2022",
    comments: [
      "Processo aberto",
      "Processo partiu para as partes assinarem",
      "Processo agora está em análise final",
      "Processo já tem data final",
    ],
    dateEnd: "16/12/2022",
    setor: "enap",
  },
  {
    id: "ee5999d7-02e9-4b3d-a1ab-f067eef54173",
    documentName: "Licitação Compras - Notebooks",
    status: "Em andamento",
    details: "Processo de licitação para compra de notebooks",
    dateInit: "30/11/2022",
    comments: ["Processo em aberto e sem previsão de conclusão"],
    dateEnd: "",
    setor: "tre",
  },
  {
    id: "ee5999d7-02e9-4b3d-a1ab-f067eef54173",
    documentName: "Licitação Compras - Ar Condicionado",
    status: "Finalizado",
    details: "Processo de licitação para compra de ar-condicionado",
    dateInit: "15/11/2022",
    comments: ["Processo em aberto", "Processo finalizado"],
    dateEnd: "25/11/2022",
    setor: "trj",
  },
];

//ITERAÇÃO 1

app.get("/all", (req, res) => {
  return res
    .status(200)
    .json({ messagem: "Bem vindo ao servidor da turma 91 - ENAP", data: db });
});

app.post("/create", (req, res) => {
  let form = { ...req.body, id: uuidv4() };

  db.push(form);

  return res.status(201).json({
    data: form,
    message: "Processo criado!",
  });
});

app.put("/edit/:id", (req, res) => {
  const { id } = req.params;

  const user = db.find((user) => user.id === id);

  const index = db.indexOf(user);

  db[index] = {
    ...user,
    ...req.body,
  };

  return res.status(200).json(db[index]);
});

app.delete("/deleteUser/:id", (req, res) => {
  const { id } = req.params;

  const deleteById = db.find((user) => user.id === id);
  console.log(deleteById);

  const index = db.indexOf(deleteById);

  db.splice(index, 1);

  return res.status(200).json(db);
});

// ITERAÇÃO 2

app.get("/process/:id", (req, res) => {
  const { id } = req.params;

  const process = db.find((process) => process.id === id);

  if (!process) {
    return res.status(404).json({ message: "Processo não encontrado" });
  }

  return res.status(200).json(process);
});

app.put("/addComment/:id", (req, res) => {
  /* 
    req.body -> {"comment": "algum comentário"}
  */
  const { id } = req.params;

  const process = db.find((process) => process.id === id);
  const index = db.indexOf(process);

  const update = db[index].comments.push(req.body.comment);

  return res.status(201).json(update);
});

app.get("/status/open", (req, res) => {
  const open = db.filter((process) => process.status === "Em andamento");

  if (!open.length) {
    return res.status(404).json({ msg: "Nenhum processo encontrado" });
  }

  return res.status(200).json(open);
});

app.get("/status/close", (req, res) => {
  const close = db.filter((process) => process.status === "Finalizado");

  if (!close.length) {
    return res.status(404).json({ msg: "Nenhum processo encontrado" });
  }

  return res.status(200).json(close);
});

// BÔNUS
app.get("/setor/:nomeSetor", (req, res) => {
  const { nomeSetor } = req.params;

  const setores = db.filter((process) => process.setor === nomeSetor);

  if (!setores.length) {
    return res.status(404).json({ msg: "Nenhum processo encontrado" });
  }

  return res.status(200).json(setores);
});

app.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * db.length);
  console.log(randomIndex);

  const process = db[randomIndex];

  return res.status(200).json(process);
});

app.listen(process.env.PORT, () => {
  console.log("App up and running on port: http://localhost:8080");
});
