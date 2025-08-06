import { Injectable } from '@nestjs/common';
import { DataPersistenceService } from '../../../../shared/data-persistence.service';
import { Precio as PrecioInterface } from '../../../../shared/interfaces';

@Injectable()
export class PreciosService {
  constructor(private readonly dataService: DataPersistenceService) {}

  async findAll(): Promise<PrecioInterface[]> {
    return await this.dataService.getAllPrecios();
  }

  async findActivos(): Promise<PrecioInterface[]> {
    const precios = await this.dataService.getAllPrecios();
    return precios.filter(precio => precio.activo);
  }

  async findByTipoGasolina(tipoGasolina: string): Promise<PrecioInterface | null> {
    return await this.dataService.getPrecioByTipoGasolina(tipoGasolina);
  }

  async updatePrecio(tipoGasolina: string, nuevoPrecio: number): Promise<PrecioInterface | null> {
    return await this.dataService.updatePrecio(tipoGasolina, nuevoPrecio);
  }
}
