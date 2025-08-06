import { CreateLugarTuristicoDto } from '../../dtos/lugar-turistico/create-lugar-turistico.dto';
import { LugarTuristicoEntity } from '../../entities/lugar-turistico.entity';
import { LugarTuristicoRepository } from '../../repositories/lugar-turistico.repository';

export interface CreateLugarTuristicoUseCase {
  execute( dto: CreateLugarTuristicoDto ): Promise<LugarTuristicoEntity>
}

export class CreateLugarTuristico implements CreateLugarTuristicoUseCase {
  
  constructor(
    private readonly repository: LugarTuristicoRepository,
  ) {}
  
  execute( dto: CreateLugarTuristicoDto ): Promise<LugarTuristicoEntity> {
    return this.repository.create(dto);
  }
}
