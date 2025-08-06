import { Injectable } from '@nestjs/common';
import { DataPersistenceService } from '../../../../shared/data-persistence.service';
import { TipoGasolina } from '../../../../shared/interfaces';

@Injectable()
export class TiposGasolinaService {
  constructor(private readonly dataService: DataPersistenceService) {}

  async findAll(): Promise<TipoGasolina[]> {
    return await this.dataService.getAllTiposGasolina();
  }

  async findDisponibles(): Promise<TipoGasolina[]> {
    const tipos = await this.dataService.getAllTiposGasolina();
    return tipos.filter(tipo => tipo.disponible && tipo.stock > 0);
  }

  async findOne(id: string): Promise<TipoGasolina | null> {
    return await this.dataService.getTipoGasolinaById(id);
  }

  async findByTipo(tipo: string): Promise<TipoGasolina | null> {
    return await this.dataService.getTipoGasolinaByTipo(tipo);
  }
}
