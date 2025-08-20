import Sequelize, { HasOne } from 'sequelize';
import animalmodel from './animal.js';
import Doacaomodel from './Doacao.js';
import pedidos_adocaomodel from './PedidoAdocao.js';
import questionariomodel from './Questionario.js'
import usuariomodel from './usuario.js'


    const sequelize = new Sequelize({
        dialect : 'sqlite',
        storage : './database/database.sqlite'
    });
    
    const animal = animalmodel(sequelize);
    const doacao = Doacaomodel(sequelize);
    const pedidosAdocao = pedidos_adocaomodel(sequelize);
    const questionario = questionariomodel(sequelize);
    const usuario = usuariomodel(sequelize);

  
usuario.hasOne(questionario, { foreignKey: "tutor_id"});
  questionario.belongsTo(Tutor, {foreignKey: "tutor_id"});
  
  usuario.hasMany(pedidosAdocao, {foreignKey: "tutor_id"});
  pedidosAdocao.belongsTo(Tutor, {foreignKey: "tutor_id"});

  animal.hasMany(pedidosAdocao, {foreignKey: "animal_id"});
  pedidosAdocao.belongsTo(Animal, {foreignKey: "animal_id"});
  


const connect = async () =>  {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Conexão com o banco de dados foi bem sucedida.');
    }
    catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error);
    };
};
export {sequelize, connect };

