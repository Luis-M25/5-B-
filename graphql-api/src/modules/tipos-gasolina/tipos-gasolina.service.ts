import { Injectable } from '@nestjs/common';
import { DataPersistenceService } from '../../../../shared/data-persistence.service';
import { TipoGasolinaType, FiltroTiposGasolinaInput } from './dto/tipo-gasolina.dto';

@Injectable()
export class TiposGasolinaService {
  constructor(private readonly dataService: DataPersistenceService) {}

  async obtenerTiposGasolina(filtros?: FiltroTiposGasolinaInput): Promise<TipoGasolinaType[]> {
    try {
      const tiposGasolina = await this.dataService.getAllTiposGasolina();
      const precios = await this.dataService.getAllPrecios();

      let tiposFiltrados = tiposGasolina;

      // Aplicar filtros
      if (filtros?.disponible !== undefined) {
        tiposFiltrados = tiposFiltrados.filter(tipo => tipo.disponible === filtros.disponible);
      }

      if (filtros?.tipoGasolina) {
        tiposFiltrados = tiposFiltrados.filter(tipo => 
          tipo.tipo.toLowerCase().includes(filtros.tipoGasolina!.toLowerCase())
        );
      }

      if (filtros?.stockMinimo) {
        tiposFiltrados = tiposFiltrados.filter(tipo => tipo.stock >= filtros.stockMinimo!);
      }

      // Enriquecer con precios actuales
      const tiposConPrecios: TipoGasolinaType[] = tiposFiltrados.map(tipo => {
        const precio = precios.find(p => p.tipoGasolina === tipo.tipo && p.activo);
        return {
          ...tipo,
          precioActual: precio?.precioLitro || 0,
          fechaActualizacion: precio?.fechaActualizacion || new Date()
        };
      });

      return tiposConPrecios;
    } catch (error) {
      throw new Error(`Error al obtener tipos de gasolina: ${error.message}`);
    }
  }

  async obtenerTipoGasolinaPorId(id: string): Promise<TipoGasolinaType | null> {
    try {
      const tipo = await this.dataService.getTipoGasolinaById(id);
      if (!tipo) return null;

      const precios = await this.dataService.getAllPrecios();
      const precio = precios.find(p => p.tipoGasolina === tipo.tipo && p.activo);

      return {
        ...tipo,
        precioActual: precio?.precioLitro || 0,
        fechaActualizacion: precio?.fechaActualizacion || new Date()
      };
    } catch (error) {
      throw new Error(`Error al obtener tipo de gasolina: ${error.message}`);
    }
  }

  async obtenerTiposDisponibles(): Promise<TipoGasolinaType[]> {
    try {
      const tiposDisponibles = await this.obtenerTiposGasolina({ disponible: true });
      return tiposDisponibles.filter(tipo => tipo.stock > 0);
    } catch (error) {
      throw new Error(`Error al obtener tipos disponibles: ${error.message}`);
    }
  }

  async verificarDisponibilidad(tipoGasolina: string, cantidadRequerida: number): Promise<boolean> {
    try {
      const tipo = await this.dataService.getTipoGasolinaByTipo(tipoGasolina);
      if (!tipo || !tipo.disponible) return false;

      return tipo.stock >= cantidadRequerida;
    } catch (error) {
      return false;
    }
  }

  async obtenerStockPorTipo(tipoGasolina: string): Promise<number> {
    try {
      const tipo = await this.dataService.getTipoGasolinaByTipo(tipoGasolina);
      return tipo?.stock || 0;
    } catch (error) {
      return 0;
    }
  }
}
