import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusquedaService } from './busqueda.service';
import { BusquedaController } from './busqueda.controller';
import { Busqueda } from './entities/busqueda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Busqueda])],
  controllers: [BusquedaController],
  providers: [BusquedaService],
  exports: [BusquedaService],
})
export class BusquedaModule {}
