import express from "express";
import { Doacao } from "../database/index.js";

const router = express.Router();

router.post("/doacoes", async (req, res) => {
  try {
    const { nome, email, valor, mensagem } = req.body;

    if (!valor || valor <= 0) {
      return res.status(400).json({ erro: "Valor da doação é obrigatório e deve ser um número positivo" });
    }

    const novaDoacao = await Doacao.create({
      nome,
      email,
      valor,
      mensagem,
      linkPix: "00020126580014BR.GOV.BCB.PIX0136chavepix-ficticia@exemplo.com5204000053039865405100.005802BR5920Nome Exemplo6009Sao Paulo62070503***6304ABCD"
    });

    return res.status(201).json(novaDoacao);
  } catch (error) {
    console.error("Erro ao registrar doação:", error);
    return res.status(500).json({ erro: "Erro ao processar a doação" });
  }
});

export default router;
