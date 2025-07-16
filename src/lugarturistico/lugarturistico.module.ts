import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LugarturisticoService } from './lugarturistico.service';
import { LugarturisticoGateway } from './lugarturistico.gateway';
import { LugarturisticoController } from './lugarturistico.controller';
import { Lugarturistico } from './entities/lugarturistico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lugarturistico])],
  controllers: [LugarturisticoController],
  providers: [LugarturisticoGateway, LugarturisticoService],
  exports: [LugarturisticoService],
})
export class LugarturisticoModule {}
