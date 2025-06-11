import { EstudianteEntity } from '../entities/estudiante.entity';

export abstract class EstudianteDatasource {
  
  abstract create(estudiante: Partial<EstudianteEntity>): Promise<EstudianteEntity>;
  
  abstract getAll(): Promise<EstudianteEntity[]>;
  
  abstract getById(id: number): Promise<EstudianteEntity | null>;
  
  abstract getByEmail(email: string): Promise<EstudianteEntity | null>;
  
  abstract getByCodigo(codigo: string): Promise<EstudianteEntity | null>;
  
  abstract getByCarrera(carrera: string): Promise<EstudianteEntity[]>;
  
  abstract update(id: number, estudiante: Partial<EstudianteEntity>): Promise<EstudianteEntity>;
  
  abstract delete(id: number): Promise<boolean>;
  
}
