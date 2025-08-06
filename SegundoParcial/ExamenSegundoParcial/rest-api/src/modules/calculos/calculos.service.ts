import { Injectable } from '@nestjs/common';
import { DataPersistenceService } from '../../../../shared/data-persistence.service';
import { CalculoCosto } from '../../../../shared/interfaces';

@Injectable()
export class CalculosService {
  constructor(private readonly dataService: DataPersistenceService) {}

  async calcularCosto(tipoGasolina: string, litros: number): Promise<CalculoCosto | null> {
    return await this.dataService.calcularCosto(tipoGasolina, litros);
  }
}
