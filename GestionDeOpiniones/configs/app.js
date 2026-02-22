import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import postRoutes from '../src/publicaciones/publi.routes.js';
import commentRoutes from '../src/comentarios/comment.routes.js';

export const createApp = () => {
    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(helmet());

    app.use('/api/posts', postRoutes);
    app.use('/api/comments', commentRoutes);

    return app;
};