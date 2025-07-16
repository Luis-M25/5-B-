import { CreateLugarTuristicoDto, UpdateLugarTuristicoDto } from '../../domain/dtos';
import { LugarTuristicoEntity } from '../../domain/entities/lugar-turistico.entity';
import { LugarTuristicoRepository } from '../../domain/repositories/lugar-turistico.repository';
import { LugarTuristicoDatasource } from '../../domain/datasources/lugar-turistico.datasource';

export class LugarTuristicoRepositoryImpl implements LugarTuristicoRepository {

  constructor(
    private readonly datasource: LugarTuristicoDatasource,
  ) {}

  create(createDto: CreateLugarTuristicoDto): Promise<LugarTuristicoEntity> {
    return this.datasource.create(createDto);
  }

  getAll(): Promise<LugarTuristicoEntity[]> {
    return this.datasource.getAll();
  }

  findById(id: string): Promise<LugarTuristicoEntity> {
    return this.datasource.findById(Number(id));
  }

  updateById(updateDto: UpdateLugarTuristicoDto): Promise<LugarTuristicoEntity> {
    return this.datasource.updateById(Number(updateDto.id), updateDto);
  }

  deleteById(id: string): Promise<LugarTuristicoEntity> {
    return this.datasource.deleteById(Number(id));
  }

  buscarPorCategoria(categoria: string): Promise<LugarTuristicoEntity[]> {
    return this.datasource.buscarPorCategoria(categoria);
  }
}
