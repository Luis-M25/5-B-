import { Injectable } from '@nestjs/common';
import { DataPersistenceService } from '../../shared/data-persistence.service';

@Injectable()
export class EstadisticasService {
  constructor(private readonly dataService: DataPersistenceService) {}

  async getEstadisticas() {
    return this.dataService.getEstadisticas();
  }

  async getVentasPorFecha(fechaInicio: Date, fechaFin: Date) {
    const ventas = await this.dataService.getAllVentas();
    return ventas.filter(v => {
      const fechaVenta = new Date(v.fechaCreacion);
      return fechaVenta >= fechaInicio && fechaVenta <= fechaFin;
    });
  }

  async getVentasPorOperador(operadorId: string) {
    const ventas = await this.dataService.getAllVentas();
    return ventas.filter(v => v.operadorId === operadorId);
  }

  async getVentasPorSurtidor(surtidorId: string) {
    const ventas = await this.dataService.getAllVentas();
    return ventas.filter(v => v.surtidorId === surtidorId);
  }

  async getResumenVentasDelDia() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const mañana = new Date(hoy);
    mañana.setDate(mañana.getDate() + 1);

    const ventasDelDia = await this.getVentasPorFecha(hoy, mañana);
    
    const totalVentas = ventasDelDia.length;
    const montoTotal = ventasDelDia.reduce((sum, venta) => sum + venta.montoTotal, 0);
    const litrosTotales = ventasDelDia.reduce((sum, venta) => sum + venta.litros, 0);

    return {
      fecha: hoy.toISOString().split('T')[0],
      totalVentas,
      montoTotal,
      litrosTotales,
      promedioLitrosPorVenta: totalVentas > 0 ? litrosTotales / totalVentas : 0
    };
  }
}
