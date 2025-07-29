import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Busqueda } from './busqueda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Busqueda])],
  providers: [],
  exports: [],
})
export class BusquedaModule {}
