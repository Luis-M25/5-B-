import { Injectable } from '@nestjs/common';
import { DataPersistenceService } from '../../../../shared/data-persistence.service';
import { FormaPago } from '../../../../shared/interfaces';

@Injectable()
export class FormasPagoService {
  constructor(private readonly dataService: DataPersistenceService) {}

  async findAll(): Promise<FormaPago[]> {
    return await this.dataService.getAllFormasPago();
  }

  async findActivas(): Promise<FormaPago[]> {
    const formas = await this.dataService.getAllFormasPago();
    return formas.filter(forma => forma.activo);
  }

  async findOne(id: string): Promise<FormaPago | null> {
    return await this.dataService.getFormaPagoById(id);
  }

  async findByTipo(tipo: string): Promise<FormaPago | null> {
    return await this.dataService.getFormaPagoByTipo(tipo);
  }
}
