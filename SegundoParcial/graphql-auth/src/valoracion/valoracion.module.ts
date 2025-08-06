import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Valoracion } from './valoracion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Valoracion])],
  providers: [],
  exports: [],
})
export class ValoracionModule {}
