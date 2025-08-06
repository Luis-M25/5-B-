import { Injectable } from '@nestjs/common';
import { DataPersistenceService } from '../../../../shared/data-persistence.service';
import { CreateClienteDto } from '../../../../shared/dtos';
import { Cliente } from '../../../../shared/interfaces';

@Injectable()
export class ClientesService {
  constructor(private readonly dataService: DataPersistenceService) {}

  async findAll(): Promise<Cliente[]> {
    return await this.dataService.getAllClientes();
  }

  async findOne(id: string): Promise<Cliente | null> {
    return await this.dataService.getClienteById(id);
  }

  async findByCedula(cedula: string): Promise<Cliente | null> {
    return await this.dataService.getClienteByCedula(cedula);
  }

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const clienteData = {
      ...createClienteDto,
      fechaRegistro: new Date()
    };
    return await this.dataService.createCliente(clienteData);
  }
}
