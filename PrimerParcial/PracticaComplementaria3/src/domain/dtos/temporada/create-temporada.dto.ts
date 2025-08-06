export class CreateTemporadaDto {

  private constructor(
    public readonly nombre: string,
    public readonly fechaInicio: Date,
    public readonly fechaFin: Date,
    public readonly descripcion?: string,
  ){}

  static create( props: {[key:string]: any} ): [string?, CreateTemporadaDto?]  {
    const { nombre, fechaInicio, fechaFin, descripcion } = props;

    if ( !nombre ) return ['Nombre property is required', undefined];
    if ( !fechaInicio ) return ['FechaInicio property is required', undefined];
    if ( !fechaFin ) return ['FechaFin property is required', undefined];

    const newFechaInicio = new Date(fechaInicio);
    const newFechaFin = new Date(fechaFin);
    
    if ( isNaN( newFechaInicio.getTime() ) ) {
      return ['FechaInicio must be a valid date', undefined];
    }
    if ( isNaN( newFechaFin.getTime() ) ) {
      return ['FechaFin must be a valid date', undefined];
    }
    if ( newFechaInicio >= newFechaFin ) {
      return ['FechaInicio must be before FechaFin', undefined];
    }

    return [undefined, new CreateTemporadaDto(nombre, newFechaInicio, newFechaFin, descripcion)];
  }
}
