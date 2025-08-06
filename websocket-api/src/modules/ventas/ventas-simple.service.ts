import { Injectable } from '@nestjs/common';
import { DataPersistenceServiceLocal } from '../../shared/data-persistence-local.service';

@Injectable()
export class VentasSimpleService {
  constructor(private readonly dataService: DataPersistenceServiceLocal) {}

  async obtenerFormasPago(): Promise<any[]> {
    console.log('🔧 VentasSimpleService: obtenerFormasPago llamado');
    try {
      const result = await this.dataService.getAllFormasPago();
      console.log('🔧 Resultado de getAllFormasPago:', result);
      return result;
    } catch (error) {
      console.error('🔧 Error en obtenerFormasPago:', error);
      throw error;
    }
  }

  async obtenerClientes(): Promise<any[]> {
    return this.dataService.getAllClientes();
  }

  async procesarVenta(ventaData: any): Promise<any> {
    return this.dataService.createVenta(ventaData);
  }
}
