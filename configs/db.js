'use strict';

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: process.env.DB_SQL_LOGGING === 'true' ? console.log : false,
  define: {
    freezeTableName: true, 
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const dbConnection = async () => {
  try {
    console.log('PostgreSQL | Trying to connect...');

    await sequelize.authenticate();
    console.log('PostgreSQL | Connected to PostgreSQL');

    const { User } = await import('../src/users/user.model.js');
    const { Role } = await import('../src/auth/role.model.js');
    const { Publication } = await import('../src/publications/publication.model.js');
    const { Comment } = await import('../src/comments/comment.model.js');

    // Relaciones
    User.belongsTo(Role, { foreignKey: 'role_id', as: 'userRole' });
    Role.hasMany(User, { foreignKey: 'role_id', as: 'roleUsers' });

    User.hasMany(Publication, { foreignKey: 'author_id', as: 'userPublications' });
    Publication.belongsTo(User, { foreignKey: 'author_id', as: 'author' });

    Publication.hasMany(Comment, { foreignKey: 'publication_id', as: 'postComments' });
    Comment.belongsTo(Publication, { foreignKey: 'publication_id', as: 'parentPublication' });

    User.hasMany(Comment, { foreignKey: 'author_id', as: 'userComments' });
    Comment.belongsTo(User, { foreignKey: 'author_id', as: 'commentAuthor' });

    console.log('PostgreSQL | Associations established');

    if (process.env.NODE_ENV === 'development') {
      const syncLogging = process.env.DB_SQL_LOGGING === 'true' ? console.log : false;
      
      // CAMBIO CLAVE: force: true para limpiar la DB una sola vez
      await sequelize.sync({ force: false, logging: syncLogging });
      console.log('PostgreSQL | Database WIPED and Models synchronized');
    }
  } catch (error) {
    console.error('PostgreSQL | Could not connect to PostgreSQL');
    console.error('PostgreSQL | Error:', error.message);
    process.exit(1);
  }
};

const gracefulShutdown = async (signal) => {
  console.log(`PostgreSQL | Received ${signal}. Closing database connection...`);
  try {
    await sequelize.close();
    console.log('PostgreSQL | Database connection closed successfully');
    process.exit(0);
  } catch (error) {
    console.error('PostgreSQL | Error during graceful shutdown:', error.message);
    process.exit(1);
  }
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2'));