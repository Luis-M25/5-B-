import { CreateBusquedaDto } from '../../domain/dtos/busqueda/create-busqueda.dto';
import { BusquedaEntity } from '../../domain/entities/busqueda.entity';
import { BusquedaDatasource } from '../../domain/datasources/busqueda.datasource';

export class BusquedaDatasourceImpl implements BusquedaDatasource {
  private busquedas: BusquedaEntity[] = [];
  private nextId = 1;

  async create(createBusquedaDto: CreateBusquedaDto): Promise<BusquedaEntity> {
    const busqueda = new BusquedaEntity(
      (this.nextId++).toString(),
      createBusquedaDto.termino,
      [],
      new Date()
    );
    
    this.busquedas.push(busqueda);
    return busqueda;
  }

  async getAll(): Promise<BusquedaEntity[]> {
    return this.busquedas;
  }

  async findById(id: number): Promise<BusquedaEntity> {
    const busqueda = this.busquedas.find(b => b.id === id.toString());
    if (!busqueda) throw `Busqueda with id ${id} not found`;
    return busqueda;
  }

  async deleteById(id: number): Promise<BusquedaEntity> {
    const busqueda = await this.findById(id);
    this.busquedas = this.busquedas.filter(b => b.id !== id.toString());
    return busqueda;
  }
}
