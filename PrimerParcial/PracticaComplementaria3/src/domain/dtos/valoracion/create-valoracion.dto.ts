export class CreateValoracionDto {

  private constructor(
    public readonly puntuacion: number,
    public readonly comentario: string,
    public readonly lugarTuristicoId: number,
    public readonly usuarioId?: number,
  ){}

  static create( props: {[key:string]: any} ): [string?, CreateValoracionDto?]  {
    const { puntuacion, comentario, lugarTuristicoId, usuarioId } = props;

    if ( !puntuacion ) return ['Puntuacion property is required', undefined];
    if ( puntuacion < 1 || puntuacion > 5 ) return ['Puntuacion must be between 1 and 5', undefined];
    if ( !comentario ) return ['Comentario property is required', undefined];
    if ( !lugarTuristicoId ) return ['LugarTuristicoId property is required', undefined];

    return [undefined, new CreateValoracionDto(puntuacion, comentario, lugarTuristicoId, usuarioId)];
  }
}
