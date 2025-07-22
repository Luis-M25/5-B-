import { CreateBusquedaDto } from '../../dtos/busqueda/create-busqueda.dto';
import { BusquedaEntity } from '../../entities/busqueda.entity';
import { BusquedaRepository } from '../../repositories/busqueda.repository';

export interface CreateBusquedaUseCase {
  execute( dto: CreateBusquedaDto ): Promise<BusquedaEntity>
}

export class CreateBusqueda implements CreateBusquedaUseCase {
  
  constructor(
    private readonly repository: BusquedaRepository,
  ) {}
  
  execute( dto: CreateBusquedaDto ): Promise<BusquedaEntity> {
    return this.repository.create(dto);
  }
}
