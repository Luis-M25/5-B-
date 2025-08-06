import { Injectable } from '@nestjs/common';
import { DataPersistenceService } from '../../../../shared/data-persistence.service';
import { Surtidor, ApiResponse } from '../../../../shared/interfaces';
import { GetSurtidoresDto, SurtidorResponseDto, SurtidorDetalleDto, AsignarSurtidorDto, LiberarSurtidorDto } from './dto/surtidor.dto';

@Injectable()
export class SurtidoresService {
  constructor(private readonly dataService: DataPersistenceService) {}

  async obtenerSurtidores(filtros?: GetSurtidoresDto): Promise<ApiResponse<SurtidorResponseDto[]>> {
    try {
      const surtidores = await this.dataService.getAllSurtidores();
      
      let surtidoresFiltrados = surtidores;

      // Aplicar filtros
      if (filtros?.estado) {
        surtidoresFiltrados = surtidoresFiltrados.filter(s => s.estado === filtros.estado);
      }

      if (filtros?.ubicacion) {
        surtidoresFiltrados = surtidoresFiltrados.filter(s => 
          s.ubicacion.toLowerCase().includes(filtros.ubicacion!.toLowerCase())
        );
      }

      if (filtros?.tipoGasolina) {
        surtidoresFiltrados = surtidoresFiltrados.filter(s => 
          s.tiposGasolinaDisponibles.includes(filtros.tipoGasolina!)
        );
      }

      if (filtros?.capacidadMinima) {
        surtidoresFiltrados = surtidoresFiltrados.filter(s => 
          s.capacidadMaxima >= filtros.capacidadMinima!
        );
      }

      // Convertir a DTO con información adicional
      const surtidoresResponse: SurtidorResponseDto[] = surtidoresFiltrados.map(surtidor => ({
        ...surtidor,
        disponibleParaVenta: surtidor.estado === 'disponible',
        porcentajeLlenado: Math.round((surtidor.combustibleActual / surtidor.capacidadMaxima) * 100)
      }));

      return {
        success: true,
        data: surtidoresResponse,
        message: `Se encontraron ${surtidoresResponse.length} surtidores`,
        timestamp: new Date()
      };
    } catch (error) {
      return {
        success: false,
        error: `Error al obtener surtidores: ${error.message}`,
        timestamp: new Date()
      };
    }
  }

  async obtenerSurtidorPorId(id: string): Promise<ApiResponse<SurtidorDetalleDto>> {
    try {
      const surtidor = await this.dataService.getSurtidorById(id);
      
      if (!surtidor) {
        return {
          success: false,
          error: 'Surtidor no encontrado',
          timestamp: new Date()
        };
      }

      // Obtener estadísticas del surtidor
      const ventasHoy = await this.obtenerVentasHoy(id);
      const litrosVendidosHoy = await this.obtenerLitrosVendidosHoy(id);
      const ultimaVenta = await this.obtenerUltimaVenta(id);

      const surtidorDetalle: SurtidorDetalleDto = {
        ...surtidor,
        disponibleParaVenta: surtidor.estado === 'disponible',
        porcentajeLlenado: Math.round((surtidor.combustibleActual / surtidor.capacidadMaxima) * 100),
        ventasHoy,
        litrosVendidosHoy,
        ultimaVenta,
        ultimoMantenimiento: new Date('2024-07-15T10:00:00Z'), // Mock data
        proximoMantenimiento: new Date('2024-09-15T10:00:00Z') // Mock data
      };

      return {
        success: true,
        data: surtidorDetalle,
        timestamp: new Date()
      };
    } catch (error) {
      return {
        success: false,
        error: `Error al obtener surtidor: ${error.message}`,
        timestamp: new Date()
      };
    }
  }

  async obtenerSurtidoresDisponibles(): Promise<ApiResponse<SurtidorResponseDto[]>> {
    try {
      const surtidores = await this.dataService.getAllSurtidores();
      const surtidoresDisponibles = surtidores
        .filter(s => s.estado === 'disponible')
        .map(surtidor => ({
          ...surtidor,
          disponibleParaVenta: true,
          porcentajeLlenado: Math.round((surtidor.combustibleActual / surtidor.capacidadMaxima) * 100)
        }));

      return {
        success: true,
        data: surtidoresDisponibles,
        message: `${surtidoresDisponibles.length} surtidores disponibles`,
        timestamp: new Date()
      };
    } catch (error) {
      return {
        success: false,
        error: `Error al obtener surtidores disponibles: ${error.message}`,
        timestamp: new Date()
      };
    }
  }

  async asignarSurtidor(datos: AsignarSurtidorDto): Promise<ApiResponse<SurtidorResponseDto>> {
    try {
      const surtidor = await this.dataService.getSurtidorById(datos.surtidorId);
      
      if (!surtidor) {
        return {
          success: false,
          error: 'Surtidor no encontrado',
          timestamp: new Date()
        };
      }

      if (surtidor.estado !== 'disponible') {
        return {
          success: false,
          error: 'Surtidor no está disponible',
          timestamp: new Date()
        };
      }

      // Actualizar estado del surtidor
      const surtidorActualizado = await this.dataService.updateSurtidor(datos.surtidorId, {
        estado: 'ocupado'
      });

      if (!surtidorActualizado) {
        return {
          success: false,
          error: 'Error al actualizar surtidor',
          timestamp: new Date()
        };
      }

      const response: SurtidorResponseDto = {
        ...surtidorActualizado,
        disponibleParaVenta: false,
        porcentajeLlenado: Math.round((surtidorActualizado.combustibleActual / surtidorActualizado.capacidadMaxima) * 100)
      };

      return {
        success: true,
        data: response,
        message: 'Surtidor asignado exitosamente',
        timestamp: new Date()
      };
    } catch (error) {
      return {
        success: false,
        error: `Error al asignar surtidor: ${error.message}`,
        timestamp: new Date()
      };
    }
  }

  async liberarSurtidor(datos: LiberarSurtidorDto): Promise<ApiResponse<SurtidorResponseDto>> {
    try {
      const surtidor = await this.dataService.getSurtidorById(datos.surtidorId);
      
      if (!surtidor) {
        return {
          success: false,
          error: 'Surtidor no encontrado',
          timestamp: new Date()
        };
      }

      // Actualizar estado del surtidor
      const surtidorActualizado = await this.dataService.updateSurtidor(datos.surtidorId, {
        estado: 'disponible'
      });

      if (!surtidorActualizado) {
        return {
          success: false,
          error: 'Error al actualizar surtidor',
          timestamp: new Date()
        };
      }

      const response: SurtidorResponseDto = {
        ...surtidorActualizado,
        disponibleParaVenta: true,
        porcentajeLlenado: Math.round((surtidorActualizado.combustibleActual / surtidorActualizado.capacidadMaxima) * 100)
      };

      return {
        success: true,
        data: response,
        message: 'Surtidor liberado exitosamente',
        timestamp: new Date()
      };
    } catch (error) {
      return {
        success: false,
        error: `Error al liberar surtidor: ${error.message}`,
        timestamp: new Date()
      };
    }
  }

  private async obtenerVentasHoy(surtidorId: string): Promise<number> {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    const ventasResponse = await this.dataService.getAllVentas();
    return ventasResponse.items.filter(venta => 
      venta.surtidorId === surtidorId && 
      new Date(venta.fechaVenta) >= hoy
    ).length;
  }

  private async obtenerLitrosVendidosHoy(surtidorId: string): Promise<number> {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    const ventasResponse = await this.dataService.getAllVentas();
    const ventasHoy = ventasResponse.items.filter(venta => 
      venta.surtidorId === surtidorId && 
      new Date(venta.fechaVenta) >= hoy &&
      venta.estado === 'completada'
    );

    return ventasHoy.reduce((total, venta) => total + venta.litros, 0);
  }

  private async obtenerUltimaVenta(surtidorId: string): Promise<Date | undefined> {
    const ventasResponse = await this.dataService.getAllVentas();
    const ventasSurtidor = ventasResponse.items
      .filter(venta => venta.surtidorId === surtidorId)
      .sort((a, b) => new Date(b.fechaVenta).getTime() - new Date(a.fechaVenta).getTime());

    return ventasSurtidor.length > 0 ? new Date(ventasSurtidor[0].fechaVenta) : undefined;
  }
}
