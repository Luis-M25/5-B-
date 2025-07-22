import { LugarTuristicoEntity } from '../../entities/lugar-turistico.entity';
import { LugarTuristicoRepository } from '../../repositories/lugar-turistico.repository';

export interface DeleteLugarTuristicoUseCase {
  execute( id: number ): Promise<LugarTuristicoEntity>
}

export class DeleteLugarTuristico implements DeleteLugarTuristicoUseCase {
  constructor(
    private readonly repository: LugarTuristicoRepository,
  ) {}
  
  execute( id: number ): Promise<LugarTuristicoEntity> {
    return this.repository.deleteById(id.toString());
  }
}
