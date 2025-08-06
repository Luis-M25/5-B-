import { Injectable } from '@nestjs/common';
import { DataPersistenceService } from '../../../shared/data-persistence.service';
import { Operador } from '../../../shared/interfaces';

@Injectable()
export class OperadoresService {
  constructor(private readonly dataService: DataPersistenceService) {}

  async getAllOperadores(): Promise<Operador[]> {
    return this.dataService.getAllOperadores();
  }

  async getOperadorById(id: string): Promise<Operador | null> {
    return this.dataService.getOperadorById(id);
  }

  async getOperadoresActivos(): Promise<Operador[]> {
    const operadores = await this.dataService.getAllOperadores();
    return operadores.filter(op => op.estado === 'activo');
  }

  async updateOperadorEstado(id: string, estado: 'activo' | 'inactivo'): Promise<Operador | null> {
    return this.dataService.updateOperador(id, { estado });
  }
}
