import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token de autenticação não fornecido." });
    }
    const decodedToken = jwt.verify(token, "sua_chave_secreta");
    req.usuario = decodedToken;
    next();
  } catch (error) {
    console.error("Erro no middleware de autenticação:", error);
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
};

export default authMiddleware;