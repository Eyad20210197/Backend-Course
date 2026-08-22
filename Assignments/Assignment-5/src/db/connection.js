import { Sequelize } from 'sequelize';
import {
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT,
    DB_USER,
} from '../config.js';

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    logging: false,
    pool: {
        max: 5,
        min: 0
    }
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        const modelOrder = ['User', 'Post', 'Comment'];
        for (const modelName of modelOrder) {
            const model = sequelize.models[modelName];
            if (!model) {
                throw new Error(`${modelName} model has not been initialized`);
            }
            await model.sync({ alter: true });
        }
        console.log('DB Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
};
export default sequelize;
