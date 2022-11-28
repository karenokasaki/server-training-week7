import express from "express";
import { v4 as uuidv4 } from "uuid";

const userRoute = express.Router();

//banco de dados que usaremos de exemplo
const db = [
  {
    id: uuidv4(),
    user: "karen",
    age: 29,
    role: "professora",
    active: true,
    endereco: {
      cidade: "ribas do rio pardo",
      estado: "MS",
    },
    tarefas: ["fazer a próxima aula", "atualizar portal"],
  },
];

// ITERAÇÃO 1
//criação das rotas
userRoute.get("/all-users", (req, res) => {
  console.log(req.url);
  console.log(req.method);

  return res
    .status(200)
    .json({ messagem: "Bem vindo ao servidor da turma 91 - ENAP", data: db });
});

userRoute.post("/newUser", (req, res) => {
  console.log(req.body);

  let form = { ...req.body, id: uuidv4() };

  db.push(form);

  return res.status(201).json({
    data: form,
    message: "Usuário criado!",
  });
});

userRoute.get("/user/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);

  const user = db.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ message: "Usário não encontrado" });
  }

  return res.status(200).json(user);
});

userRoute.delete("/deleteUser/:id", (req, res) => {
  const { id } = req.params;

  const deleteById = db.find((user) => user.id === id);

  const index = db.indexOf(deleteById);

  db.splice(index, 1);

  return res.status(200).json(db);
});

userRoute.put("/editUser/:id", (req, res) => {
  const { id } = req.params;

  const user = db.find((user) => user.id === id);

  const index = db.indexOf(user);

  db[index] = {
    ...user,
    ...req.body,
  };

  return res.status(200).json(db[index]);
});

userRoute.put("/addTarefa/:id", (req, res) => {
  const { id } = req.params;
  const tarefa = req.body.tarefa;

  const user = db.find((user) => user.id === id);
  const index = db.indexOf(user);

  const update = db[index].tarefas.push(tarefa);

  return res.status(201).json(update);
});

export default userRoute;
