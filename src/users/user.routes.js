'use strict';

import { Router } from 'express';
import { 
    getPendingUsers, 
    approveUser, 
    updateProfile, 
    updatePassword 
} from './user.controller.js';

import { validateJWT } from '../../middlewares/validate-JWT.js';
import { validateAdmin } from '../../middlewares/validate-role.js';

const router = Router();

/**
 * RUTAS PÚBLICAS / PROTEGIDAS (Cualquier usuario logueado)
 */

// Editar perfil (Nombre, Username) - Requiere Token
router.put('/profile', validateJWT, updateProfile);

// Editar solo contraseña - Requiere Token
router.put('/update-password', validateJWT, updatePassword);


/**
 * RUTAS ADMINISTRATIVAS (Solo ADMIN)
 */

// Ver usuarios pendientes de aprobación
router.get('/pending', validateJWT, validateAdmin, getPendingUsers);

// Aprobar cuenta de usuario y asignar rol
router.put('/approve', validateJWT, validateAdmin, approveUser);

export default router;