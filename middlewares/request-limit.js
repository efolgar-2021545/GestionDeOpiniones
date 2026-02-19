'use strict';

// Middleware temporal sin límite (desactivado para desarrollo)

export const requestLimit = (req, res, next) => {
    next();
};

export const authRateLimit = (req, res, next) => {
    next();
};