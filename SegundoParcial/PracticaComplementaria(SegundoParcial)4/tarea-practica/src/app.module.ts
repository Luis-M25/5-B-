import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusquedaModule } from './busqueda/busqueda.module';
import { LugarTurisitcoModule } from './lugar-turisitco/lugar-turisitco.module';
import { TemporadaModule } from './temporada/temporada.module';
import { Busqueda } from './busqueda/entities/busqueda.entity';
import { LugarTurisitco } from './lugar-turisitco/entities/lugar-turisitco.entity';
import { Temporada } from './temporada/entities/temporada.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Busqueda, LugarTurisitco, Temporada],
      synchronize: true, // Solo para desarrollo
    }),
    BusquedaModule,
    LugarTurisitcoModule,
    TemporadaModule,
  ],
})
export class AppModule {}