export class CreateLugarTuristicoDto {
  private constructor(
    public readonly nombre: string,
    public readonly descripcion: string,
    public readonly ubicacion: string,
    public readonly categoria: string
  ) {}

  static create(props: {[key:string]: any}): [string?, CreateLugarTuristicoDto?] {
    const { nombre, descripcion, ubicacion, categoria } = props;

    if (!nombre) return ['Nombre es requerido', undefined];
    if (!descripcion) return ['Descripción es requerida', undefined];
    
    return [undefined, new CreateLugarTuristicoDto(nombre, descripcion, ubicacion, categoria)];
  }
}
