import { Injectable } from '@nestjs/common';
import { DataPersistenceService } from '../../shared/data-persistence.service';
import { Surtidor } from '../../shared/interfaces';

@Injectable()
export class SurtidoresService {
  constructor(private readonly dataService: DataPersistenceService) {}

  async getAllSurtidores(): Promise<Surtidor[]> {
    return this.dataService.getAllSurtidores();
  }

  async getSurtidorById(id: string): Promise<Surtidor | null> {
    return this.dataService.getSurtidorById(id);
  }

  async getSurtidoresDisponibles(): Promise<Surtidor[]> {
    const surtidores = await this.dataService.getAllSurtidores();
    return surtidores.filter(s => s.estado === 'disponible');
  }

  async updateSurtidorEstado(id: string, estado: 'disponible' | 'ocupado' | 'mantenimiento'): Promise<Surtidor | null> {
    return this.dataService.updateSurtidor(id, { estado });
  }
}
