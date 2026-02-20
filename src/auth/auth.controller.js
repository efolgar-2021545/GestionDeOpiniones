'use strict';

import argon2 from 'argon2';
import { User } from '../users/user.model.js';
import { Role } from './role.model.js';
import { generateJWT } from '../../helpers/generate.jwt.js';
import { generateUserId } from '../../helpers/uuid.generator.js';

// REGISTRO
export const register = async (req, res) => {
    try {
        const {
            name,
            username,
            email,
            password,
            dpi,
            address,
            phone,
            job,
            monthlyIncome,
        } = req.body;

        // 1. Validar ingresos
        if (monthlyIncome < 100) {
            return res.status(400).json({
                success: false,
                message: 'Ingresos mínimos Q100 requeridos',
            });
        }

        // 2. Verificar duplicados por Email o Username
        const exists = await User.findOne({
            where: { Email: email }
        });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: 'El correo electrónico ya está registrado',
            });
        }

        // 3. Buscar rol CLIENT (Validación de seguridad añadida)
        const clientRole = await Role.findOne({
            where: { Name: 'CLIENT' },
        });

        if (!clientRole) {
            return res.status(500).json({
                success: false,
                message: 'Error interno: El rol CLIENT no ha sido inicializado en la base de datos.',
            });
        }

        // 4. Encriptar password
        const hash = await argon2.hash(password);

        // 5. Generar número de cuenta
        const accountNumber = `ACC-${Date.now()}`;

        // 6. Crear usuario con mapeo correcto de campos
        const user = await User.create({
            Id: generateUserId(),
            Name: name,
            Username: username,
            Email: email,
            Password: hash,
            DPI: dpi,
            Address: address,
            Phone: phone,
            Job: job,
            MonthlyIncome: monthlyIncome,
            AccountNumber: accountNumber,
            RoleId: clientRole.Id, // Aquí es donde fallaba antes
            Status: true, // Lo cambiamos a true para que puedas loguearte de una vez en el lab
        });

        return res.status(201).json({
            success: true,
            message: 'Registro exitoso.',
            userId: user.Id,
        });
    } catch (error) {
        console.error("DETALLE DEL ERROR EN REGISTRO:", error);
        return res.status(500).json({
            success: false,
            message: 'Error en registro',
            error: error.message
        });
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Buscar usuario por email O por username (como piden las instrucciones)
        const user = await User.findOne({
            where: email ? { Email: email } : { Username: username },
            include: {
                model: Role,
                as: 'role',
            },
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Credenciales inválidas',
            });
        }

        // Verificar password
        const valid = await argon2.verify(user.Password, password);

        if (!valid) {
            return res.status(400).json({
                success: false,
                message: 'Credenciales inválidas',
            });
        }

        // Generar token
        const token = await generateJWT(user.Id, {
            role: user.role.Name,
            email: user.Email,
        });

        return res.json({
            success: true,
            token,
            user: {
                id: user.Id,
                name: user.Name,
                username: user.Username,
                role: user.role.Name,
            },
        });
    } catch (error) {
        console.error("DETALLE DEL ERROR EN LOGIN:", error);
        return res.status(500).json({
            success: false,
            message: 'Error en login',
        });
    }
};