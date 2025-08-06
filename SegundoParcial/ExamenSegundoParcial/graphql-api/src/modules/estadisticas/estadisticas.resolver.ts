import { Resolver, Query, Args } from '@nestjs/graphql';
import { EstadisticasService } from './estadisticas.service';
import { EstadisticasType } from './estadisticas.model';

@Resolver()
export class EstadisticasResolver {
  constructor(private readonly estadisticasService: EstadisticasService) {}

  @Query(() => EstadisticasType, { name: 'estadisticas' })
  async getEstadisticas() {
    return this.estadisticasService.getEstadisticas();
  }

  @Query(() => EstadisticasType, { name: 'estadisticasPorFecha' })
  async getEstadisticasPorFecha(@Args('fecha') fecha: string) {
    return this.estadisticasService.getEstadisticasPorFecha(fecha);
  }

  @Query(() => EstadisticasType, { name: 'estadisticasPorOperador' })
  async getEstadisticasPorOperador(@Args('operadorId') operadorId: string) {
    return this.estadisticasService.getEstadisticasPorOperador(operadorId);
  }

  @Query(() => EstadisticasType, { name: 'estadisticasPorSurtidor' })
  async getEstadisticasPorSurtidor(@Args('surtidorId') surtidorId: string) {
    return this.estadisticasService.getEstadisticasPorSurtidor(surtidorId);
  }
}
