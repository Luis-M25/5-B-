import { CreateEstudianteDto } from '../../dtos';
import { EstudianteEntity } from '../../entities/estudiante.entity';
import { EstudianteRepository } from '../../repositories/estudiante.repository';
import { ClaseRepository } from '../../repositories/clase.repository';

export interface MatricularEstudianteUseCase {
  execute(dto: CreateEstudianteDto): Promise<EstudianteEntity>
}

export class MatricularEstudiante implements MatricularEstudianteUseCase {
  
  constructor(
    private readonly estudianteRepository: EstudianteRepository,
    private readonly claseRepository: ClaseRepository,
  ) {}
  
  async execute(dto: CreateEstudianteDto): Promise<EstudianteEntity> {
    // Verificar que la clase existe
    await this.claseRepository.findById(dto.claseId);
    
    // Verificar que el email no esté duplicado en la misma clase
    const estudiantesClase = await this.estudianteRepository.findByClaseId(dto.claseId);
    const emailExiste = estudiantesClase.some(est => est.email === dto.email);
    
    if (emailExiste) {
      throw new Error('El email ya está registrado en esta clase');
    }
    
    // Crear el estudiante
    const estudiante = await this.estudianteRepository.create(dto);
    
    // Incrementar contador en la clase
    await this.claseRepository.incrementarEstudiantes(dto.claseId);
    
    return estudiante;
  }
}
