import { ClaseEntity } from '../../entities/clase.entity';

export interface GetClaseUseCase {
  execute(id: number): Promise<ClaseEntity>;
}

export interface ClaseRepository {
  findById(id: number): Promise<ClaseEntity | null>;
}

export class GetClase implements GetClaseUseCase {
  
  constructor(
    private readonly claseRepository: ClaseRepository
  ) {}

  async execute(id: number): Promise<ClaseEntity> {
    if (!id || id <= 0) {
      throw new Error('ID de clase inválido');
    }

    const clase = await this.claseRepository.findById(id);
    
    if (!clase) {
      throw new Error('Clase no encontrada');
    }

    return clase;
  }
}
