import { ClaseEntity } from '../../entities/clase.entity';

export interface DeleteClaseUseCase {
  execute(id: number): Promise<ClaseEntity>;
}

export interface ClaseRepository {
  delete(id: number): Promise<ClaseEntity>;
  findById(id: number): Promise<ClaseEntity | null>;
}

export class DeleteClase implements DeleteClaseUseCase {
  
  constructor(
    private readonly claseRepository: ClaseRepository
  ) {}

  async execute(id: number): Promise<ClaseEntity> {
    if (!id || id <= 0) {
      throw new Error('ID de clase inválido');
    }

    // Verificar que la clase existe antes de eliminar
    const existingClase = await this.claseRepository.findById(id);
    if (!existingClase) {
      throw new Error('Clase no encontrada');
    }

    // Eliminar la clase
    const deletedClase = await this.claseRepository.delete(id);
    
    return deletedClase;
  }
}
