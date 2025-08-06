import { Injectable } from '@nestjs/common';
import { DataPersistenceService } from '../../../shared/data-persistence.service';

@Injectable()
export class EstadisticasService {
  constructor(private readonly dataService: DataPersistenceService) {}

  async getEstadisticas() {
    return this.dataService.getEstadisticas();
  }

  async getEstadisticasPorFecha(fecha: string) {
    const result = await this.dataService.getAllVentas();
    const ventas = Array.isArray(result) ? result : result.items;
    const ventasFiltradas = ventas.filter(venta => 
      venta.fechaCreacion.toString().startsWith(fecha)
    );

    const totalVentas = ventasFiltradas.length;
    const ingresosTotales = ventasFiltradas.reduce((sum, venta) => sum + venta.montoTotal, 0);
    const litrosTotales = ventasFiltradas.reduce((sum, venta) => sum + venta.litros, 0);
    const promedioVentaPorLitro = litrosTotales > 0 ? ingresosTotales / litrosTotales : 0;

    const surtidores = await this.dataService.getAllSurtidores();
    const operadores = await this.dataService.getAllOperadores();

    return {
      totalVentas,
      ingresosTotales,
      litrosTotales,
      promedioVentaPorLitro,
      surtidoresActivos: surtidores.filter(s => s.estado === 'disponible' || s.estado === 'ocupado').length,
      operadoresActivos: operadores.filter(o => o.estado === 'activo').length,
      fechaConsulta: new Date().toISOString(),
      fechaFiltro: fecha
    };
  }

  async getEstadisticasPorOperador(operadorId: string) {
    const result = await this.dataService.getAllVentas();
    const ventas = Array.isArray(result) ? result : result.items;
    const ventasOperador = ventas.filter(venta => venta.operadorId === operadorId);

    const totalVentas = ventasOperador.length;
    const ingresosTotales = ventasOperador.reduce((sum, venta) => sum + venta.montoTotal, 0);
    const litrosTotales = ventasOperador.reduce((sum, venta) => sum + venta.litros, 0);
    const promedioVentaPorLitro = litrosTotales > 0 ? ingresosTotales / litrosTotales : 0;

    const surtidores = await this.dataService.getAllSurtidores();
    const operadores = await this.dataService.getAllOperadores();

    return {
      totalVentas,
      ingresosTotales,
      litrosTotales,
      promedioVentaPorLitro,
      surtidoresActivos: surtidores.filter(s => s.estado === 'disponible' || s.estado === 'ocupado').length,
      operadoresActivos: operadores.filter(o => o.estado === 'activo').length,
      fechaConsulta: new Date().toISOString(),
      operadorId
    };
  }

  async getEstadisticasPorSurtidor(surtidorId: string) {
    const result = await this.dataService.getAllVentas();
    const ventas = Array.isArray(result) ? result : result.items;
    const ventasSurtidor = ventas.filter(venta => venta.surtidorId === surtidorId);

    const totalVentas = ventasSurtidor.length;
    const ingresosTotales = ventasSurtidor.reduce((sum, venta) => sum + venta.montoTotal, 0);
    const litrosTotales = ventasSurtidor.reduce((sum, venta) => sum + venta.litros, 0);
    const promedioVentaPorLitro = litrosTotales > 0 ? ingresosTotales / litrosTotales : 0;

    const surtidores = await this.dataService.getAllSurtidores();
    const operadores = await this.dataService.getAllOperadores();

    return {
      totalVentas,
      ingresosTotales,
      litrosTotales,
      promedioVentaPorLitro,
      surtidoresActivos: surtidores.filter(s => s.estado === 'disponible' || s.estado === 'ocupado').length,
      operadoresActivos: operadores.filter(o => o.estado === 'activo').length,
      fechaConsulta: new Date().toISOString(),
      surtidorId
    };
  }
}
