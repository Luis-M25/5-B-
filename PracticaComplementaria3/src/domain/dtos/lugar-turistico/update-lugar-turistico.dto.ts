export class UpdateLugarTuristicoDto {
  private constructor(
    public readonly id: string,
    public readonly nombre?: string,
    public readonly descripcion?: string,
    public readonly ubicacion?: string,
    public readonly categoria?: string,
    public readonly activo?: boolean,
    public readonly calificacion?: number
  ) {}

  get values() {
    const returnObj: {[key: string]: any} = {};
    
    if (this.nombre) returnObj.nombre = this.nombre;
    if (this.descripcion) returnObj.descripcion = this.descripcion;
    if (this.ubicacion) returnObj.ubicacion = this.ubicacion;
    if (this.categoria) returnObj.categoria = this.categoria;
    if (this.activo !== undefined) returnObj.activo = this.activo;
    if (this.calificacion !== undefined) returnObj.calificacion = this.calificacion;
    
    return returnObj;
  }

  static create(props: {[key:string]: any}): [string?, UpdateLugarTuristicoDto?] {
    const { id, nombre, descripcion, ubicacion, categoria, activo, calificacion } = props;

    if (!id) return ['Id es requerido', undefined];
    
    return [undefined, new UpdateLugarTuristicoDto(id, nombre, descripcion, ubicacion, categoria, activo, calificacion)];
  }
}
