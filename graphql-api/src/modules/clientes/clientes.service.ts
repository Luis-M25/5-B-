import { Injectable } from '@nestjs/common';
import { DataPersistenceService } from '../../../../shared/data-persistence.service';
import { CreateClienteInput } from '../../shared/inputs';
import { Cliente as ClienteInterface } from '../../../../shared/interfaces';

@Injectable()
export class ClientesService {
  constructor(private readonly dataService: DataPersistenceService) {}

  async findAll(): Promise<ClienteInterface[]> {
    return await this.dataService.getAllClientes();
  }

  async findOne(id: string): Promise<ClienteInterface | null> {
    return await this.dataService.getClienteById(id);
  }

  async findByCedula(cedula: string): Promise<ClienteInterface | null> {
    return await this.dataService.getClienteByCedula(cedula);
  }

  async create(createClienteInput: CreateClienteInput): Promise<ClienteInterface> {
    const clienteData = {
      ...createClienteInput,
      fechaRegistro: new Date(),
      tipoCliente: createClienteInput.tipoCliente as any
    };
    return await this.dataService.createCliente(clienteData);
  }
}
