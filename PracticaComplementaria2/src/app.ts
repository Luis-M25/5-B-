import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaDestino } from './entidades/ICategoriadestino';
import { Destino } from './entidades/IDestino';
import { Experiencia } from './entidades/IExperiencia';
import { PreferenciaTuristica } from './entidades/IPreferenciaturistica';
import { Recomendacion } from './entidades/IRecomendaciones';
import { DestinosController } from './controladores/controlador.destino';
import { CategoriasController } from './controladores/controlador.categorias';
import { ExperienciasController } from './controladores/controlador.experiencia';
import { PreferenciasController } from './controladores/controlador.preferencias';
import { RecomendacionesController } from './controladores/controlador.recomendaciones';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'turismo_db',
      entities: [
        CategoriaDestino,
        Destino,
        Experiencia,
        PreferenciaTuristica,
        Recomendacion
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      CategoriaDestino,
      Destino,
      Experiencia,
      PreferenciaTuristica,
      Recomendacion
    ])
  ],
  controllers: [
    DestinosController,
    CategoriasController,
    ExperienciasController,
    PreferenciasController,
    RecomendacionesController
  ],
})
export class AppModule {}
