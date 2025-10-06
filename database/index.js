import Sequelize from 'sequelize';
import animalmodel from './animal.js';
import Doacaomodel from './doacao.js';
import pedidos_adocaomodel from './PedidoAdocao.js';
import questionariomodel from './questionario.js';
import usuariomodel from './usuario.js';
import { createAdminUser } from '../seeds/admin-seed.js';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    host: 'db.utapffvtxxrsnekkbehx.supabase.co',
    port: 6543,
    protocol: 'tcp4'
});

const Animal = animalmodel(sequelize);
const Doacao = Doacaomodel(sequelize);
const PedidoAdocao = pedidos_adocaomodel(sequelize);
const Questionario = questionariomodel(sequelize);
const Usuario = usuariomodel(sequelize);

Usuario.hasOne(Questionario, { foreignKey: "tutor_id" });
Questionario.belongsTo(Usuario, { foreignKey: "tutor_id" });

Usuario.hasMany(PedidoAdocao, { foreignKey: "tutor_id" });
PedidoAdocao.belongsTo(Usuario, { foreignKey: "tutor_id" });

Animal.hasMany(PedidoAdocao, { foreignKey: "animal_id" });
PedidoAdocao.belongsTo(Animal, { foreignKey: "animal_id" });

const connect = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log('Conexão com o banco de dados foi bem sucedida e modelos sincronizados.');
        await createAdminUser();
    } catch (error) {
        console.error('Não foi possível conectar ou sincronizar o banco de dados:', error);
    }
};

export { Animal, Doacao, PedidoAdocao, Questionario, Usuario, connect };