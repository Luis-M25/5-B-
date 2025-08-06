export class TemporadaEntity {
  constructor(
    public id: number,
    public nombre: string,
    public fechaInicio: Date,
    public fechaFin: Date,
    public descripcion?: string
  ) {}

  get isActive() {
    const today = new Date();
    return today >= this.fechaInicio && today <= this.fechaFin;
  }

  public static fromObject( object: {[key: string]: any} ): TemporadaEntity {
    const { id, nombre, fechaInicio, fechaFin, descripcion } = object;
    if ( !id ) throw 'Id is required';
    if ( !nombre ) throw 'Nombre is required';
    if ( !fechaInicio ) throw 'FechaInicio is required';
    if ( !fechaFin ) throw 'FechaFin is required';

    const newFechaInicio = new Date(fechaInicio);
    const newFechaFin = new Date(fechaFin);
    
    if ( isNaN( newFechaInicio.getTime() ) ) {
      throw 'FechaInicio is not a valid date'
    }
    if ( isNaN( newFechaFin.getTime() ) ) {
      throw 'FechaFin is not a valid date'
    }

    return new TemporadaEntity(id, nombre, newFechaInicio, newFechaFin, descripcion);
  }
}
