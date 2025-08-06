import { Injectable } from '@nestjs/common';
import { DataPersistenceService } from '../../../../shared/data-persistence.service';
import { Operador, ApiResponse } from '../../../../shared/interfaces';
import { GetOperadoresDto, OperadorResponseDto, OperadorDetalleDto } from './dto/operador.dto';

@Injectable()
export class OperadoresService {
  constructor(private readonly dataService: DataPersistenceService) {}

  async obtenerOperadores(filtros?: GetOperadoresDto): Promise<ApiResponse<OperadorResponseDto[]>> {
    try {
      const operadores = await this.dataService.getAllOperadores();
      
      let operadoresFiltrados = operadores;

      // Aplicar filtros
      if (filtros?.estado) {
        operadoresFiltrados = operadoresFiltrados.filter(op => op.estado === filtros.estado);
      }

      if (filtros?.turno) {
        operadoresFiltrados = operadoresFiltrados.filter(op => op.turno === filtros.turno);
      }

      // Convertir a DTO y agregar información de disponibilidad
      const operadoresResponse: OperadorResponseDto[] = await Promise.all(
        operadoresFiltrados.map(async (operador) => {
          const disponible = await this.verificarDisponibilidad(operador.id);
          return {
            ...operador,
            disponible
          };
        })
      );

      return {
        success: true,
        data: operadoresResponse,
        message: `Se encontraron ${operadoresResponse.length} operadores`,
        timestamp: new Date()
      };
    } catch (error) {
      return {
        success: false,
        error: `Error al obtener operadores: ${error.message}`,
        timestamp: new Date()
      };
    }
  }

  async obtenerOperadorPorId(id: string): Promise<ApiResponse<OperadorDetalleDto>> {
    try {
      const operador = await this.dataService.getOperadorById(id);
      
      if (!operador) {
        return {
          success: false,
          error: 'Operador no encontrado',
          timestamp: new Date()
        };
      }

      // Obtener estadísticas del operador
      const ventasHoy = await this.obtenerVentasHoy(id);
      const montoVendidoHoy = await this.obtenerMontoVendidoHoy(id);
      const ultimaVenta = await this.obtenerUltimaVenta(id);
      const disponible = await this.verificarDisponibilidad(id);

      const operadorDetalle: OperadorDetalleDto = {
        ...operador,
        disponible,
        ventasHoy,
        montoVendidoHoy,
        ultimaVenta
      };

      return {
        success: true,
        data: operadorDetalle,
        timestamp: new Date()
      };
    } catch (error) {
      return {
        success: false,
        error: `Error al obtener operador: ${error.message}`,
        timestamp: new Date()
      };
    }
  }

  async obtenerOperadoresDisponibles(): Promise<ApiResponse<OperadorResponseDto[]>> {
    try {
      const operadores = await this.dataService.getAllOperadores();
      const operadoresActivos = operadores.filter(op => op.estado === 'activo');

      const operadoresDisponibles: OperadorResponseDto[] = [];

      for (const operador of operadoresActivos) {
        const disponible = await this.verificarDisponibilidad(operador.id);
        if (disponible) {
          operadoresDisponibles.push({
            ...operador,
            disponible: true
          });
        }
      }

      return {
        success: true,
        data: operadoresDisponibles,
        message: `${operadoresDisponibles.length} operadores disponibles`,
        timestamp: new Date()
      };
    } catch (error) {
      return {
        success: false,
        error: `Error al obtener operadores disponibles: ${error.message}`,
        timestamp: new Date()
      };
    }
  }

  private async verificarDisponibilidad(operadorId: string): Promise<boolean> {
    // Verificar si el operador tiene ventas en proceso
    const ventasResponse = await this.dataService.getAllVentas();
    const ventasEnProceso = ventasResponse.items.filter(venta => 
      venta.operadorId === operadorId && 
      ['pendiente', 'procesando'].includes(venta.estado)
    );

    return ventasEnProceso.length === 0;
  }

  private async obtenerVentasHoy(operadorId: string): Promise<number> {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    const ventasResponse = await this.dataService.getAllVentas();
    return ventasResponse.items.filter(venta => 
      venta.operadorId === operadorId && 
      new Date(venta.fechaVenta) >= hoy
    ).length;
  }

  private async obtenerMontoVendidoHoy(operadorId: string): Promise<number> {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    const ventasResponse = await this.dataService.getAllVentas();
    const ventasHoy = ventasResponse.items.filter(venta => 
      venta.operadorId === operadorId && 
      new Date(venta.fechaVenta) >= hoy &&
      venta.estado === 'completada'
    );

    return ventasHoy.reduce((total, venta) => total + venta.montoTotal, 0);
  }

  private async obtenerUltimaVenta(operadorId: string): Promise<Date | undefined> {
    const ventasResponse = await this.dataService.getAllVentas();
    const ventasOperador = ventasResponse.items
      .filter(venta => venta.operadorId === operadorId)
      .sort((a, b) => new Date(b.fechaVenta).getTime() - new Date(a.fechaVenta).getTime());

    return ventasOperador.length > 0 ? new Date(ventasOperador[0].fechaVenta) : undefined;
  }
}
