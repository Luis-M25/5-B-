import { LugarTuristicoEntity } from '../../entities/lugar-turistico.entity';
import { LugarTuristicoRepository } from '../../repositories/lugar-turistico.repository';

export interface GetLugarTuristicoUseCase {
  execute(id: string): Promise<LugarTuristicoEntity>;
}

export class GetLugarTuristico implements GetLugarTuristicoUseCase {
  constructor(
    private readonly repository: LugarTuristicoRepository,
  ) {}

  execute(id: string): Promise<LugarTuristicoEntity> {
    return this.repository.findById(id);
  }
}
