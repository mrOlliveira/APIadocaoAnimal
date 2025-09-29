import Sequelize from 'sequelize';
import animalmodel from './animal.js';
import Doacaomodel from './Doacao.js';
import pedidos_adocaomodel from './PedidoAdocao.js';
import questionariomodel from './Questionario.js';
import usuariomodel from './usuario.js';
import { createAdminUser } from '../seeds/admin-seed.js';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/database.sqlite'
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
        console.log('Conexão com o banco de dados foi bem sucedida.');
        await createAdminUser();
    } catch (error) {
        console.error('Não foi possível conectar com o banco de dados:', error);
    }
};

export { Animal, Doacao, PedidoAdocao, Questionario, Usuario, connect };
