'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';

// Importación de configuraciones y middlewares
import { corsConfiguration } from './cors-configuration.js';
import { helmetConfiguration } from './helmet-configuration.js';
import { requestLimit } from '../middlewares/request-limit.js';
import { serverGenericErrorHandler } from '../middlewares/server-genericError-handler.js';

// Importación de Rutas (Ajustadas a tu estructura de carpetas real)
import authRoutes from '../src/auth/auth.routes.js';
import userRoutes from '../src/users/user.routes.js';
import publicationRoutes from '../src/publications/publication.routes.js';
import commentRoutes from '../src/comments/comment.routes.js';

const app = express();
config();

// Configuración de middlewares globales
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsConfiguration));
app.use(helmet(helmetConfiguration));
app.use(morgan('dev'));
app.use(requestLimit);

// --- DECLARACIÓN DE RUTAS ---
// Para Postman usa: http://localhost:3005/auth/...
app.use('/auth', authRoutes);

// Para Postman usa: http://localhost:3005/users/...
app.use('/users', userRoutes);

// Para Postman usa: http://localhost:3005/publications/...
app.use('/publications', publicationRoutes);

// Para Postman usa: http://localhost:3005/comments/...
app.use('/comments', commentRoutes);

// Manejador de errores global (Debe ir al final)
app.use(serverGenericErrorHandler);

export const initServer = () => {
    const port = process.env.PORT || 3005;
    app.listen(port, () => {
        console.log(`Server HTTP running on port ${port}`);
    });
};