import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LugarTuristico } from './lugar-turistico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LugarTuristico])],
  providers: [],
  exports: [],
})
export class LugarTuristicoModule {}
