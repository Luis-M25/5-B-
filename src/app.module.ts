import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusquedaModule } from './busqueda/busqueda.module';
import { LugarturisticoModule } from './lugarturistico/lugarturistico.module';
import { TemporadaModule } from './temporada/temporada.module';
import { ValoracionModule } from './valoracion/valoracion.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'app.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // solo desarrollo
    }),
    BusquedaModule,
    LugarturisticoModule,
    TemporadaModule,
    ValoracionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
