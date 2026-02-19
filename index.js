'use strict';

import { initServer } from './configs/app.js';
import { dbConnection } from './configs/db.js';
// Cambiamos 'seed' por 'helpers' y verificamos el nombre del archivo
import { seedRoles } from './helpers/role-seed.js'; 

const startApp = async () => {
    try {
        await dbConnection();
        
        // Ejecutamos el seed de roles desde helpers
        await seedRoles();

        initServer();
    } catch (error) {
        console.error('Failed to start the application:', error.message);
    }
};

startApp();