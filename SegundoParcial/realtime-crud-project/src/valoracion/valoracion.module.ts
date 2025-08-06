import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValoracionService } from './valoracion.service';
import { ValoracionGateway } from './valoracion.gateway';
import { ValoracionController } from './valoracion.controller';
import { Valoracion } from './entities/valoracion.entity';
import { Lugarturistico } from '../lugarturistico/entities/lugarturistico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Valoracion, Lugarturistico])],
  controllers: [ValoracionController],
  providers: [ValoracionGateway, ValoracionService],
  exports: [ValoracionService],
})
export class ValoracionModule {}
