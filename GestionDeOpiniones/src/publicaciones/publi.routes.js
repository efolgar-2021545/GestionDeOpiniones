import { Router } from 'express';
import {
    createPost,
    updatePost,
    deletePost
} from './publi.controller.js';
import { verifyToken } from '../../middlewares/user.comprobated.js';

const router = Router();

router.post('/', verifyToken, createPost);
router.put('/:id', verifyToken, updatePost);
router.delete('/:id', verifyToken, deletePost);

export default router;