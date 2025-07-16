import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusquedaService } from './busqueda.service';
import { BusquedaGateway } from './busqueda.gateway';
import { BusquedaController } from './busqueda.controller';
import { Busqueda } from './entities/busqueda.entity';
import { Lugarturistico } from '../lugarturistico/entities/lugarturistico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Busqueda, Lugarturistico])],
  controllers: [BusquedaController],
  providers: [BusquedaGateway, BusquedaService],
  exports: [BusquedaService],
})
export class BusquedaModule {}
