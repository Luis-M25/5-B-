import dotenv from 'dotenv';

dotenv.config();

export const envs = {
  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  PUBLIC_PATH: process.env.PUBLIC_PATH || 'public',
  
  // Flag para desactivar TypeORM
  DISABLE_TYPEORM: process.env.DISABLE_TYPEORM === 'true',
  
  // Database configuration
  DATABASE_URL: process.env.DATABASE_URL || '',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  DB_NAME: process.env.DB_NAME || 'lugares_turisticos',
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  
  // MongoDB
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/lugares_turisticos',
};