import { Injectable } from '@nestjs/common';
import { DataPersistenceService } from '../../../../shared/data-persistence.service';

@Injectable()
export class EstadisticasService {
  constructor(private readonly dataService: DataPersistenceService) {}

  async getEstadisticas() {
    return await this.dataService.getEstadisticas();
  }

  async getDashboard() {
    const estadisticas = await this.dataService.getEstadisticas();
    const precios = await this.dataService.getAllPrecios();
    const preciosActivos = precios.filter(p => p.activo);
    
    return {
      ...estadisticas,
      preciosActivos,
      ultimaActualizacion: new Date()
    };
  }
}
