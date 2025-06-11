import { ClaseEntity } from '../../entities/clase.entity';

export interface GetClasesUseCase {
  execute(): Promise<ClaseEntity[]>;
}

export interface ClaseRepository {
  getAll(): Promise<ClaseEntity[]>;
}

export class GetClases implements GetClasesUseCase {
  
  constructor(
    private readonly claseRepository: ClaseRepository
  ) {}

  async execute(): Promise<ClaseEntity[]> {
    const clases = await this.claseRepository.getAll();
    return clases;
  }
}
