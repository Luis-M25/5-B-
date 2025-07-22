import { UpdateLugarTuristicoDto } from '../../dtos';
import { LugarTuristicoEntity } from '../../entities/lugar-turistico.entity';
import { LugarTuristicoRepository } from '../../repositories/lugar-turistico.repository';

export interface UpdateLugarTuristicoUseCase {
  execute( dto: UpdateLugarTuristicoDto ): Promise<LugarTuristicoEntity>
}

export class UpdateLugarTuristico implements UpdateLugarTuristicoUseCase {
  constructor(
    private readonly repository: LugarTuristicoRepository,
  ) {}
  
  execute( dto: UpdateLugarTuristicoDto ): Promise<LugarTuristicoEntity> {
    return this.repository.updateById(dto);
  }
}
