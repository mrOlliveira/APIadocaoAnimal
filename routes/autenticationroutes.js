import express from "express";
import encrypt from "encryptjs";
import { Usuario } from "../database/index.js";

const router = express.Router();
const chave = "segredo";

router.post("/autenticacao", async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) return res.status(401).json({ erro: "Email ou senha inválidos." });

    const senhaDescriptografada = encrypt.decrypt(usuario.senha, chave, 256);

    if (senhaDescriptografada !== senha) {
      return res.status(401).json({ erro: "Email ou senha inválidos." });
    }

    return res.status(200).json({
      mensagem: "Login bem-sucedido",
      usuario: {
        id: usuario.id,
        nome_completo: usuario.nome_completo,
        email: usuario.email,
        administrador: usuario.administrador
      }
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ erro: "Erro interno ao tentar fazer o login." });
  }
});

export default router;
