import { LugarTuristicoEntity } from './lugar-turistico.entity';

export class BusquedaEntity {
  constructor(
    public id: string,
    public termino: string,
    public resultados: LugarTuristicoEntity[],
    public fechaBusqueda: Date,
    public usuarioId?: string
  ) {}

  static fromObject(object: {[key: string]: any}): BusquedaEntity {
    const { id, termino, resultados, fechaBusqueda, usuarioId } = object;
    
    if (!id) throw 'Id is required';
    if (!termino) throw 'Termino is required';
    
    const newFechaBusqueda = new Date(fechaBusqueda);
    
    return new BusquedaEntity(id, termino, resultados || [], newFechaBusqueda, usuarioId);
  }
}
