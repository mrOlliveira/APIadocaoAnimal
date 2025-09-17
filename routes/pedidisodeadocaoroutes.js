import express from "express";
import { PedidoAdocao, Usuario, Animal } from "../database/index.js";

const router = express.Router();

router.post("/adocoes", async (req, res) => {
  try {
    const { tutor_id, animal_id } = req.body;

    const tutor = await Usuario.findByPk(tutor_id);
    const animal = await Animal.findByPk(animal_id);

    if (!tutor || !animal) {
      return res.status(404).json({ erro: "Tutor ou animal não encontrado" });
    }

    const pedidoExistente = await PedidoAdocao.findOne({
      where: { tutor_id, animal_id, status: "em_analise" }
    });
    if (pedidoExistente) {
      return res.status(409).json({ erro: "Este tutor já tem um pedido de adoção para este animal" });
    }

    const fila = await PedidoAdocao.count({ where: { animal_id } });
    const novoPedido = await PedidoAdocao.create({
      tutor_id,
      animal_id,
      status: "em_analise",
      posicao_fila: fila + 1
    });

    return res.status(201).json(novoPedido);
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    return res.status(500).json({ erro: "Erro ao registrar o pedido de adoção" });
  }
});

export default router;
