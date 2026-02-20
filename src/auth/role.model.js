'use strict';

import { DataTypes } from 'sequelize';
import { sequelize } from '../../configs/db.js'; 

export const Role = sequelize.define('Role', {
    Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        field: 'id' // Forzamos el nombre físico en la tabla
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'name' // Forzamos el nombre físico en la tabla
    },
    Description: {
        type: DataTypes.STRING,
        field: 'description' // Forzamos el nombre físico en la tabla
    }
}, {
    tableName: 'roles',
    timestamps: false,
    underscored: true // Esto ayuda a que Sequelize maneje mejor los nombres en Postgres
});