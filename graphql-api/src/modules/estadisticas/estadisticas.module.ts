import { Module } from '@nestjs/common';
import { EstadisticasResolver } from './estadisticas.resolver';
import { EstadisticasService } from './estadisticas.service';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [EstadisticasResolver, EstadisticasService],
  exports: [EstadisticasService],
})
export class EstadisticasModule {}
