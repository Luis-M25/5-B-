import { AsignacionEntity } from '../entities/asignacion.entity';

export abstract class AsignacionDatasource {
  
  abstract create(asignacion: Partial<AsignacionEntity>): Promise<AsignacionEntity>;
  
  abstract getAll(): Promise<AsignacionEntity[]>;
  
  abstract getById(id: number): Promise<AsignacionEntity | null>;
  
  abstract getByUsuarioId(usuarioId: number): Promise<AsignacionEntity[]>;
  
  abstract getByProyectoId(proyectoId: number): Promise<AsignacionEntity[]>;
  
  abstract update(id: number, asignacion: Partial<AsignacionEntity>): Promise<AsignacionEntity>;
  
  abstract delete(id: number): Promise<boolean>;
  
}
