import { CreateLugarTuristicoDto, UpdateLugarTuristicoDto } from '../dtos';
import { LugarTuristicoEntity } from '../entities/lugar-turistico.entity';

export abstract class LugarTuristicoRepository {
  abstract create(createDto: CreateLugarTuristicoDto): Promise<LugarTuristicoEntity>;
  abstract getAll(): Promise<LugarTuristicoEntity[]>;
  abstract findById(id: string): Promise<LugarTuristicoEntity>;
  abstract updateById(updateDto: UpdateLugarTuristicoDto): Promise<LugarTuristicoEntity>;
  abstract deleteById(id: string): Promise<LugarTuristicoEntity>;
  abstract buscarPorCategoria(categoria: string): Promise<LugarTuristicoEntity[]>;
}
