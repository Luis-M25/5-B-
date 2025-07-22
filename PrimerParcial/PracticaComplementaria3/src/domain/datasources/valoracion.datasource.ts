import { CreateValoracionDto } from '../dtos/valoracion/create-valoracion.dto';
import { ValoracionEntity } from '../entities/valoracion.entity';

export abstract class ValoracionDatasource {
  abstract create( createValoracionDto: CreateValoracionDto ): Promise<ValoracionEntity>;
  abstract getAll(): Promise<ValoracionEntity[]>;
  abstract findById( id: number ): Promise<ValoracionEntity>;
  abstract getByLugarTuristico( lugarTuristicoId: number ): Promise<ValoracionEntity[]>;
  abstract deleteById( id: number ): Promise<ValoracionEntity>;
}
