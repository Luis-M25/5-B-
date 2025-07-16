import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemporadaService } from './temporada.service';
import { TemporadaController } from './temporada.controller';
import { Temporada } from './entities/temporada.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Temporada])],
  controllers: [TemporadaController],
  providers: [TemporadaService],
  exports: [TemporadaService],
})
export class TemporadaModule {}
