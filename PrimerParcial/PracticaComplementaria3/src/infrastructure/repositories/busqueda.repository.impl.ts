import { BusquedaDatasource, BusquedaRepository, CreateBusquedaDto, BusquedaEntity } from '../../domain';

export class BusquedaRepositoryImpl implements BusquedaRepository {

  constructor(
    private readonly datasource: BusquedaDatasource,
  ) { }

  create(createBusquedaDto: CreateBusquedaDto): Promise<BusquedaEntity> {
    return this.datasource.create(createBusquedaDto);
  }

  getAll(): Promise<BusquedaEntity[]> {
    return this.datasource.getAll();
  }

  findById(id: number): Promise<BusquedaEntity> {
    return this.datasource.findById(id);
  }

  deleteById(id: number): Promise<BusquedaEntity> {
    return this.datasource.deleteById(id);
  }
}
