import express from "express";
import { Usuario, Questionario } from "../database/index.js";

const router = express.Router();

router.post("/questionario", async (req, res) => {
  try {
    const { tutor_id } = req.body;

    const tutor = await Usuario.findByPk(tutor_id);
    if (!tutor) return res.status(404).json({ erro: "Tutor não encontrado" });

    const novoQuestionario = await Questionario.create({ ...req.body, tutor_id });
    return res.status(201).json(novoQuestionario);
  } catch (error) {
    console.error("Erro ao cadastrar questionário:", error);
    return res.status(400).json({ erro: "Todos os campos obrigatórios devem ser preenchidos corretamente." });
  }
});

export default router;
