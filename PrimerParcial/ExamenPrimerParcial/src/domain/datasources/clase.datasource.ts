import { ClaseEntity } from '../entities/clase.entity';

export abstract class ClaseDatasource {
  
  abstract create(clase: Partial<ClaseEntity>): Promise<ClaseEntity>;
  
  abstract getAll(): Promise<ClaseEntity[]>;
  
  abstract getById(id: number): Promise<ClaseEntity | null>;
  
  abstract getByMateriaId(materiaId: number): Promise<ClaseEntity[]>;
  
  abstract getByProfesorId(profesorId: number): Promise<ClaseEntity[]>;
  
  abstract getByFecha(fecha: Date): Promise<ClaseEntity[]>;
  
  abstract getByDateRange(fechaInicio: Date, fechaFin: Date): Promise<ClaseEntity[]>;
  
  abstract update(id: number, clase: Partial<ClaseEntity>): Promise<ClaseEntity>;
  
  abstract delete(id: number): Promise<boolean>;
  
}
