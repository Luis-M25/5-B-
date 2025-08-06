import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Temporada } from './temporada.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Temporada])],
  providers: [],
  exports: [],
})
export class TemporadaModule {}
