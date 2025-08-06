import { CreateTemporadaDto } from '../dtos/temporada/create-temporada.dto';
import { TemporadaEntity } from '../entities/temporada.entity';

export abstract class TemporadaDatasource {
  abstract create( createTemporadaDto: CreateTemporadaDto ): Promise<TemporadaEntity>;
  abstract getAll(): Promise<TemporadaEntity[]>;
  abstract findById( id: number ): Promise<TemporadaEntity>;
  abstract deleteById( id: number ): Promise<TemporadaEntity>;
}
