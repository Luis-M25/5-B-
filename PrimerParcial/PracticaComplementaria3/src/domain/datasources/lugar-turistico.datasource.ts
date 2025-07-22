import { CreateLugarTuristicoDto } from '../dtos/lugar-turistico/create-lugar-turistico.dto';
import { LugarTuristicoEntity } from '../entities/lugar-turistico.entity';

export abstract class LugarTuristicoDatasource {
  abstract create( createLugarTuristicoDto: CreateLugarTuristicoDto ): Promise<LugarTuristicoEntity>;
  abstract getAll(): Promise<LugarTuristicoEntity[]>;
  abstract findById( id: number ): Promise<LugarTuristicoEntity>;
  abstract deleteById( id: number ): Promise<LugarTuristicoEntity>;
  abstract updateById( id: number, updateLugarTuristicoDto: Partial<CreateLugarTuristicoDto> ): Promise<LugarTuristicoEntity>;
  abstract buscarPorCategoria( categoria: string ): Promise<LugarTuristicoEntity[]>;
  
}
