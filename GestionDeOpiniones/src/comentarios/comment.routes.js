import { Router } from 'express';
import {
    createComment,
    updateComment,
    deleteComment
} from './comment.controller.js';

import { verifyToken } from '../../middlewares/user.comprobated.js';

const router = Router();

// Crear comentario en un post
router.post('/:postId', verifyToken, createComment);

// Editar comentario
router.put('/edit/:id', verifyToken, updateComment);

// Eliminar comentario
router.delete('/:id', verifyToken, deleteComment);

export default router;