import {DataTypes, Sequelize} from 'sequelize';
import {IWarnInstance} from '../typescript/interface';

module.exports = (sequelize: Sequelize) => {
    const warnShema = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        reason: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        countWarn: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    };

    return sequelize.define<IWarnInstance>('Warn', warnShema);
}
