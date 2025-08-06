import { CreateEstudianteDto } from '../dtos';
import { EstudianteEntity } from '../entities/estudiante.entity';

export abstract class EstudianteRepository {

  abstract create(createEstudianteDto: CreateEstudianteDto): Promise<EstudianteEntity>;
  abstract getAll(): Promise<EstudianteEntity[]>;
  abstract findById(id: string): Promise<EstudianteEntity>;
  abstract deleteById(id: string): Promise<EstudianteEntity>;
  abstract findByClaseId(claseId: string): Promise<EstudianteEntity[]>;
  abstract findByEmail(email: string): Promise<EstudianteEntity | null>;
  abstract activar(id: string): Promise<EstudianteEntity>;
  abstract desactivar(id: string): Promise<EstudianteEntity>;

}
