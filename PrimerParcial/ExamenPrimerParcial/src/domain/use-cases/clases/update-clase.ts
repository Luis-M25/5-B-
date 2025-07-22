import { ClaseEntity } from '../../entities/clase.entity';

export interface UpdateClaseDto {
  nombre?: string;
  descripcion?: string;
  profesor?: string;
  horario?: string;
}

export interface UpdateClaseUseCase {
  execute(id: number, updateDto: UpdateClaseDto): Promise<ClaseEntity>;
}

export interface ClaseRepository {
  update(id: number, updateDto: UpdateClaseDto): Promise<ClaseEntity>;
  findById(id: number): Promise<ClaseEntity | null>;
}

export class UpdateClase implements UpdateClaseUseCase {
  
  constructor(
    private readonly claseRepository: ClaseRepository
  ) {}

  async execute(id: number, updateDto: UpdateClaseDto): Promise<ClaseEntity> {
    if (!id || id <= 0) {
      throw new Error('ID de clase inválido');
    }

    // Verificar que al menos un campo se está actualizando
    if (!updateDto || Object.keys(updateDto).length === 0) {
      throw new Error('Debe proporcionar al menos un campo para actualizar');
    }

    // Verificar que la clase existe
    const existingClase = await this.claseRepository.findById(id);
    if (!existingClase) {
      throw new Error('Clase no encontrada');
    }

    // Validar campos si están presentes
    if (updateDto.nombre && updateDto.nombre.trim().length === 0) {
      throw new Error('El nombre no puede estar vacío');
    }

    if (updateDto.profesor && updateDto.profesor.trim().length === 0) {
      throw new Error('El profesor no puede estar vacío');
    }

    // Actualizar la clase
    const updatedClase = await this.claseRepository.update(id, updateDto);
    
    return updatedClase;
  }
}
