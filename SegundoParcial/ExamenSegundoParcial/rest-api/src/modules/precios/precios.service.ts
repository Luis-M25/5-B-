import { Injectable } from '@nestjs/common';
import { DataPersistenceService } from '../../../../shared/data-persistence.service';
import { Precio } from '../../../../shared/interfaces';

@Injectable()
export class PreciosService {
  constructor(private readonly dataService: DataPersistenceService) {}

  async findAll(): Promise<Precio[]> {
    return await this.dataService.getAllPrecios();
  }

  async findActivos(): Promise<Precio[]> {
    const precios = await this.dataService.getAllPrecios();
    return precios.filter(precio => precio.activo);
  }

  async findByTipoGasolina(tipoGasolina: string): Promise<Precio | null> {
    return await this.dataService.getPrecioByTipoGasolina(tipoGasolina);
  }

  async updatePrecio(tipoGasolina: string, nuevoPrecio: number): Promise<Precio | null> {
    return await this.dataService.updatePrecio(tipoGasolina, nuevoPrecio);
  }
}
