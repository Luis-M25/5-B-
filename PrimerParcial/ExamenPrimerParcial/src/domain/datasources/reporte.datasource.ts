import { ReporteEntity } from '../entities/reportes.entity';

export abstract class ReporteDatasource {
  
  abstract create(reporte: Partial<ReporteEntity>): Promise<ReporteEntity>;
  
  abstract getAll(): Promise<ReporteEntity[]>;
  
  abstract getById(id: number): Promise<ReporteEntity | null>;
  
  abstract getByProyectoId(proyectoId: number): Promise<ReporteEntity[]>;
  
  abstract getByUsuarioId(usuarioId: number): Promise<ReporteEntity[]>;
  
  abstract getByDateRange(fechaInicio: Date, fechaFin: Date): Promise<ReporteEntity[]>;
  
  abstract update(id: number, reporte: Partial<ReporteEntity>): Promise<ReporteEntity>;
  
  abstract delete(id: number): Promise<boolean>;
  
}
