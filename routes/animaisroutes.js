import express from "express";
import { Animal, PedidoAdocao } from "../database/index.js";

const router = express.Router();

router.post("/animais", async (req, res) => {
  try {
    const novoAnimal = await Animal.create(req.body);
    return res.status(201).json(novoAnimal);
  } catch (error) {
    console.error("Erro ao criar animal:", error);
    return res.status(400).json({ erro: "Falha ao criar animal" });
  }
});

router.get("/animais", async (req, res) => {
  try {
    const animais = await Animal.findAll();
    return res.status(200).json({ data: animais, total: animais.length });
  } catch (error) {
    console.error("Erro ao buscar animais:", error);
    return res.status(500).json({ erro: "Erro ao buscar animais" });
  }
});

router.get("/animais/:id", async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id, {
      include: PedidoAdocao
    });
    if (!animal) return res.status(404).json({ erro: "Animal não encontrado" });
    return res.status(200).json(animal);
  } catch (error) {
    console.error("Erro ao buscar animal:", error);
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

export default router;
