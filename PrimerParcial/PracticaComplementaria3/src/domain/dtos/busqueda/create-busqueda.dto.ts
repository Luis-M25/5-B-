export class CreateBusquedaDto {
  private constructor(
    public readonly termino: string,
    public readonly usuarioId?: number,
  ){}

  static create( props: {[key:string]: any} ): [string?, CreateBusquedaDto?]  {
    const { termino, usuarioId } = props;

    if ( !termino ) return ['Termino property is required', undefined];

    return [undefined, new CreateBusquedaDto(termino, usuarioId)];
  }
}
