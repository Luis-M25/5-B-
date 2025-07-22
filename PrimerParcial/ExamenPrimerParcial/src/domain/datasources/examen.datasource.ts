import { ExamenEntity } from '../entities/examen.entity';

export abstract class ExamenDatasource {
  
  abstract create(examen: Partial<ExamenEntity>): Promise<ExamenEntity>;
  
  abstract getAll(): Promise<ExamenEntity[]>;
  
  abstract getById(id: number): Promise<ExamenEntity | null>;
  
  abstract getByMateriaId(materiaId: number): Promise<ExamenEntity[]>;
  
  abstract getByFecha(fecha: Date): Promise<ExamenEntity[]>;
  
  abstract getByDateRange(fechaInicio: Date, fechaFin: Date): Promise<ExamenEntity[]>;
  
  abstract update(id: number, examen: Partial<ExamenEntity>): Promise<ExamenEntity>;
  
  abstract delete(id: number): Promise<boolean>;
  
}
