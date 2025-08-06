import { DataSource } from 'typeorm';
import { envs } from '../../config/envs';

// Importar tus entidades TypeORM
import { BusquedaTypeOrm } from './mappers/busqueda.mapper';
import { LugarTuristicoTypeOrm } from './mappers/lugar-turistico.mapper';
import { TemporadaTypeOrm } from './mappers/temporada.mapper';
import { ValoracionTypeOrm } from './mappers/valoracion.mapper';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: envs.DB_HOST,
  port: envs.DB_PORT,
  username: envs.DB_USER,
  password: envs.DB_PASSWORD,
  database: envs.DB_NAME,
  synchronize: envs.NODE_ENV === 'development',
  logging: envs.NODE_ENV === 'development',
  entities: [
    BusquedaTypeOrm,
    LugarTuristicoTypeOrm,
    TemporadaTypeOrm,
    ValoracionTypeOrm,
  ],
  migrations: [],
  subscribers: [],
});

// Función de inicialización condicional
export const initializeDatabase = async () => {
  if (envs.DISABLE_TYPEORM) {
    console.log('TypeORM disabled - using in-memory datasources');
    return null;
  }

  if (!envs.DB_PASSWORD) {
    console.log('No database password - skipping TypeORM initialization');
    return null;
  }

  try {
    await AppDataSource.initialize();
    console.log('TypeORM DataSource initialized successfully');
    return AppDataSource;
  } catch (error) {
    console.error('Error during TypeORM DataSource initialization:', error instanceof Error ? error.message : error);
    console.log('Continuing with in-memory datasources...');
    return null;
  }
};