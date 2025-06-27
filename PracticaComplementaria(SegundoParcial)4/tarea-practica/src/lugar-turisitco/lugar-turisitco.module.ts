import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LugarTurisitcoService } from './lugar-turisitco.service';
import { LugarTurisitcoController } from './lugar-turisitco.controller';
import { LugarTurisitco } from './entities/lugar-turisitco.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LugarTurisitco])],
  controllers: [LugarTurisitcoController],
  providers: [LugarTurisitcoService],
  exports: [LugarTurisitcoService],
})
export class LugarTurisitcoModule {}
