import express from "express";
import encrypt from "encryptjs";
import { Usuario, Questionario } from "../database/index.js";

const router = express.Router();
const chave = "segredo";

router.post("/usuario", async (req, res) => {
  try {
    const { nome_completo, email, senha, cidade, estado, idade, telefone, instagram, facebook } = req.body;

    if (!nome_completo || !email || !senha || !cidade || !estado || !idade || !telefone) {
      return res.status(400).json({ erro: "Todos os campos obrigatórios devem ser preenchidos corretamente." });
    }

    const existe = await Usuario.findOne({ where: { email } });
    if (existe) return res.status(400).json({ erro: "Email preenchido já está sendo utilizado." });

    const senhaCriptografada = encrypt.encrypt(senha, chave, 256);

    const novoUsuario = await Usuario.create(//req.body)
    {
      nome_completo,
      email,
      senha: senhaCriptografada,
      cidade,
      estado,
      idade,
      telefone,
      instagram,
      facebook
    });

    return res.status(201).json(novoUsuario);
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    return res.status(500).json({ erro: "Erro interno ao cadastrar o tutor." });
  }
});

router.patch("/tutores/:id", async (req, res) => {
  try {
    const tutor = await Usuario.findByPk(req.params.id);
    if (!tutor) return res.status(404).json({ erro: "Tutor não encontrado" });

    await tutor.update(req.body);
    return res.status(200).json(tutor);
  } catch (error) {
    console.error("Erro ao atualizar tutor:", error);
    return res.status(500).json({ erro: "Erro ao atualizar os dados do tutor" });
  }
});

router.get("/tutores", async (req, res) => {
  try {
    const tutores = await Usuario.findAll({
      include: Questionario
    });

    return res.status(200).json(tutores);
  } catch (error) {
    console.error("Erro ao buscar tutores:", error);
    return res.status(500).json({ erro: "Erro ao buscar dados dos tutores" });
  }
});

router.get("/tutores/:id", async (req, res) => {
  try {
    const tutor = await Usuario.findByPk(req.params.id, {
      include: Questionario
    });
    if (!tutor) return res.status(404).json({ erro: "Tutor não encontrado" });

    return res.status(200).json(tutor);
  } catch (error) {
    console.error("Erro ao buscar tutor:", error);
    return res.status(500).json({ erro: "Erro ao buscar dados do tutor" });
  }
});

export default router;
