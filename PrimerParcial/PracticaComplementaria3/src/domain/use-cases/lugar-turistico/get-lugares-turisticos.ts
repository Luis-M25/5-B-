import { LugarTuristicoEntity } from '../../entities/lugar-turistico.entity';
import { LugarTuristicoRepository } from '../../repositories/lugar-turistico.repository';

export interface GetLugaresTuristicosUseCase {
  execute(): Promise<LugarTuristicoEntity[]>
}

export class GetLugaresTuristicos implements GetLugaresTuristicosUseCase {
  
  constructor(
    private readonly repository: LugarTuristicoRepository,
  ) {}
  
  execute(): Promise<LugarTuristicoEntity[]> {
    return this.repository.getAll();
  }
}
