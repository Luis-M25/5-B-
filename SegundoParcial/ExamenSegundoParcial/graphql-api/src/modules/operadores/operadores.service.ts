import { Injectable } from '@nestjs/common';
import { DataPersistenceService } from '../../../../shared/data-persistence.service';
import { CreateOperadorInput, UpdateOperadorInput } from '../../shared/inputs';
import { Operador as OperadorInterface } from '../../../../shared/interfaces';

@Injectable()
export class OperadoresService {
  constructor(private readonly dataService: DataPersistenceService) {}

  async findAll(): Promise<OperadorInterface[]> {
    return await this.dataService.getAllOperadores();
  }

  async findOne(id: string): Promise<OperadorInterface | null> {
    return await this.dataService.getOperadorById(id);
  }

  async create(createOperadorInput: CreateOperadorInput): Promise<OperadorInterface> {
    const operadorData = {
      ...createOperadorInput,
      fechaIngreso: new Date(createOperadorInput.fechaIngreso),
      estado: createOperadorInput.estado as any,
      turno: createOperadorInput.turno as any
    };
    return await this.dataService.createOperador(operadorData);
  }

  async update(id: string, updateOperadorInput: UpdateOperadorInput): Promise<OperadorInterface | null> {
    const updateData: any = {};
    if (updateOperadorInput.nombre) updateData.nombre = updateOperadorInput.nombre;
    if (updateOperadorInput.cedula) updateData.cedula = updateOperadorInput.cedula;
    if (updateOperadorInput.estado) updateData.estado = updateOperadorInput.estado;
    if (updateOperadorInput.turno) updateData.turno = updateOperadorInput.turno;
    
    return await this.dataService.updateOperador(id, updateData);
  }

  async remove(id: string): Promise<boolean> {
    return await this.dataService.deleteOperador(id);
  }
}
