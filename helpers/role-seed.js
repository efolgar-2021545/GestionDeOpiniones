import { Role } from '../src/auth/role.model.js';

export const seedRoles = async () => {
  try {
    // No necesitamos sync() aquí porque db.js ya lo hace
    const count = await Role.count();

    if (count === 0) {
      await Role.bulkCreate([
        { Name: 'ADMIN', Description: 'Administrator' },
        { Name: 'CLIENT', Description: 'Client User' },
      ]);

      console.log('PostgreSQL | Roles creados exitosamente: ADMIN, CLIENT');
    } else {
      console.log('PostgreSQL | Los roles ya existen en la base de datos');
    }
  } catch (error) {
    console.error('PostgreSQL | Error al crear roles:', error.message);
  }
};