import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CategoriaDestino } from './entidades/ICategoriadestino';
import { Destino } from './entidades/IDestino';
import { Experiencia } from './entidades/IExperiencia';
import { PreferenciaTuristica } from './entidades/IPreferenciaturistica';
import { Recomendacion } from './entidades/IRecomendaciones';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'turismo_db',
  entities: [
    CategoriaDestino,
    Destino,
    Experiencia,
    PreferenciaTuristica,
    Recomendacion,
  ],
  synchronize: process.env.NODE_ENV !== 'production', // Solo en desarrollo
  logging: process.env.NODE_ENV !== 'production',
};
