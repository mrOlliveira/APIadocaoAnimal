import { Usuario } from '../database/index.js';
import encrypt from 'encryptjs';

const chave = "segredo";

export const createAdminUser = async () => {
  const adminEmail = 'admin@admin.com';
  const adminSenha = 'admin';

  const existeAdmin = await Usuario.findOne({ where: { email: adminEmail } });

  if (!existeAdmin) {
    const senhaCriptografada = encrypt.encrypt(adminSenha, chave, 256);
    await Usuario.create({
      nome_completo: 'Administrador',
      email: adminEmail,
      senha: senhaCriptografada,
      cidade: 'São Paulo',
      estado: 'SP',
      idade: 30,
      telefone: '11999999999',
      administrador: true
    });
    console.log('Usuário administrador criado com sucesso.');
  } else {
    console.log('Usuário administrador já existe.');
  }
};