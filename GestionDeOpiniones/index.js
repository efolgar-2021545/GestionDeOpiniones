import dotenv from 'dotenv';
import { createApp } from './configs/app.js';
import { dbConnection } from './configs/database.js';

dotenv.config();

const app = createApp();
const PORT = process.env.PORT || 3006;

const startServer = async () => {
    await dbConnection();

    app.listen(PORT, () => {
        console.log(`GESTOR DE OPINIONES API - corriendo en puerto ${PORT}`);
    });
};

startServer();