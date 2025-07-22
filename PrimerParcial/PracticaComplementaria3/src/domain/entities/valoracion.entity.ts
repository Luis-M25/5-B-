export class ValoracionEntity {
  constructor(
    public id: number,
    public puntuacion: number,
    public comentario: string,
    public fechaValoracion: Date,
    public lugarTuristicoId: number,
    public usuarioId?: number
  ) {}

  get isHighRating() {
    return this.puntuacion >= 4;
  }

  public static fromObject( object: {[key: string]: any} ): ValoracionEntity {
    const { id, puntuacion, comentario, fechaValoracion, lugarTuristicoId, usuarioId } = object;
    if ( !id ) throw 'Id is required';
    if ( !puntuacion || puntuacion < 1 || puntuacion > 5 ) throw 'Puntuacion must be between 1 and 5';
    if ( !comentario ) throw 'Comentario is required';
    if ( !fechaValoracion ) throw 'FechaValoracion is required';
    if ( !lugarTuristicoId ) throw 'LugarTuristicoId is required';

    let newFechaValoracion = new Date(fechaValoracion);
    if ( isNaN( newFechaValoracion.getTime() ) ) {
      throw 'FechaValoracion is not a valid date'
    }

    return new ValoracionEntity(id, puntuacion, comentario, newFechaValoracion, lugarTuristicoId, usuarioId);
  }
}
