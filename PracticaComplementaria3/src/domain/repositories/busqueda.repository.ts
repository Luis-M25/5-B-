import { CreateBusquedaDto } from '../dtos/busqueda/create-busqueda.dto';
import { BusquedaEntity } from '../entities/busqueda.entity';

export abstract class BusquedaRepository {
  abstract create( createBusquedaDto: CreateBusquedaDto ): Promise<BusquedaEntity>;
  abstract getAll(): Promise<BusquedaEntity[]>;
  abstract findById( id: number ): Promise<BusquedaEntity>;
  abstract deleteById( id: number ): Promise<BusquedaEntity>;
}
