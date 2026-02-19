'use strict';

import argon2 from 'argon2';
import { User } from './user.model.js';
import { Role } from '../auth/role.model.js';
import { asyncHandler } from '../../middlewares/server-genericError-handler.js';

/**
 * ADMINISTRACIÓN (Funciones existentes del banco)
 */

// Ver usuarios pendientes (solo admin)
export const getPendingUsers = asyncHandler(async (req, res) => {
    const users = await User.findAll({
        where: { Status: false },
        attributes: {
            exclude: ['Password'],
        },
        include: {
            model: Role,
            as: 'role',
        },
    });

    return res.json({
        success: true,
        users,
    });
});

// Aprobar usuario (solo admin)
export const approveUser = asyncHandler(async (req, res) => {
    const { userId, role } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'Usuario no encontrado',
        });
    }

    const roleDb = await Role.findOne({
        where: { Name: role },
    });

    if (!roleDb) {
        return res.status(400).json({
            success: false,
            message: 'Rol inválido',
        });
    }

    user.RoleId = roleDb.Id;
    user.Status = true;

    await user.save();

    return res.json({
        success: true,
        message: 'Usuario aprobado correctamente',
    });
});

/**
 * GESTIÓN DE PERFIL - LABORATORIO #2
 */

// Editar Perfil: Nombre, Username y validación de contraseña anterior
export const updateProfile = asyncHandler(async (req, res) => {
    const { name, username, oldPassword, newPassword } = req.body;
    
    // El ID viene del middleware validateJWT (req.userId)
    const user = await User.findByPk(req.userId);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'Usuario no encontrado',
        });
    }

    // Si el usuario intenta cambiar su contraseña, es obligatorio validar la anterior
    if (newPassword) {
        if (!oldPassword) {
            return res.status(400).json({
                success: false,
                message: 'Para cambiar la contraseña debe ingresar la contraseña anterior',
            });
        }

        const validPassword = await argon2.verify(user.Password, oldPassword);
        if (!validPassword) {
            return res.status(400).json({
                success: false,
                message: 'La contraseña anterior es incorrecta',
            });
        }

        user.Password = await argon2.hash(newPassword);
    }

    // Actualizar campos básicos
    user.Name = name || user.Name;
    user.Username = username || user.Username;

    await user.save();

    res.json({
        success: true,
        message: 'Perfil actualizado correctamente',
        user: {
            name: user.Name,
            username: user.Username
        }
    });
});

// Función específica para cambio de contraseña (opcional, ya integrada en updateProfile)
export const updatePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findByPk(req.userId);

    const valid = await argon2.verify(user.Password, oldPassword);
    if (!valid) {
        return res.status(400).json({ 
            success: false, 
            message: 'La contraseña anterior no coincide' 
        });
    }

    user.Password = await argon2.hash(newPassword);
    await user.save();
    
    res.json({ 
        success: true, 
        message: 'Contraseña actualizada correctamente' 
    });
});

// NOTA: Según las instrucciones del Lab #2, no se incluye función para eliminar perfiles
// para garantizar la integridad de las opiniones y comentarios.