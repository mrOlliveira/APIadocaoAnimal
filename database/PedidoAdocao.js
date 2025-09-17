import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const PedidoAdocao = sequelize.define('PedidoAdocao', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('em_analise', 'aprovado', 'rejeitado'),
            defaultValue: 'em_analise',
            allowNull: false
        },
        posicao_fila: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        tutor_id: {  // 🔥 padronizado para snake_case
            type: DataTypes.UUID,
            allowNull: false
        },
        animal_id: { // 🔥 padronizado para snake_case
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {
        tableName: 'pedidos_adocao',
        timestamps: true
    });

    return PedidoAdocao;
};
