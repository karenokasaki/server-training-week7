import express from "express";
import { v4 as uuidv4 } from "uuid";
import UserModel from "../model/user.model.js";

const userRoute = express.Router();

userRoute.post("/create-user", async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);

    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Algo de errado não está certo" });
  }
});

userRoute.get("/all-users", async (req, res) => {
  try {
    const users = await UserModel.find();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Algo de errado não está certo" });
  }
});

userRoute.get("/oneUser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const oneUser = await UserModel.findById(id);

    return res.status(200).json(oneUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Algo de errado não está certo" });
  }
});

userRoute.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await UserModel.findByIdAndDelete(id);

    return res.status(200).json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Algo de errado não está certo" });
  }
});

userRoute.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Algo de errado não está certo" });
  }
});


/*
 // ROTAS ANTIGAS
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
}); */

export default userRoute;
