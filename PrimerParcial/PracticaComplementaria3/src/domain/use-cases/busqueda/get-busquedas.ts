import { BusquedaEntity } from '../../entities/busqueda.entity';
import { BusquedaRepository } from '../../repositories/busqueda.repository';

export interface GetBusquedasUseCase {
  execute(): Promise<BusquedaEntity[]>
}

export class GetBusquedas implements GetBusquedasUseCase {
  
  constructor(
    private readonly repository: BusquedaRepository,
  ) {}
  
  execute(): Promise<BusquedaEntity[]> {
    return this.repository.getAll();
  }
}
