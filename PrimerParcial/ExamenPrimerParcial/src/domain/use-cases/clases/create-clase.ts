import { CreateClaseDto } from '../../dtos';
import { ClaseEntity } from '../../entities/clase.entity';
import { ClaseRepository } from '../../repositories/clase.repository';

export interface CreateClaseUseCase {
  execute(dto: CreateClaseDto): Promise<ClaseEntity>
}

export class CreateClase implements CreateClaseUseCase {
  
  constructor(
    private readonly repository: ClaseRepository,
  ) {}
  
  execute(dto: CreateClaseDto): Promise<ClaseEntity> {
    return this.repository.create(dto);
  }
}
