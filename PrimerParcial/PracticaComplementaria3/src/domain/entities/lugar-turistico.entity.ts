export class LugarTuristicoEntity {
  constructor(
    public id: string,
    public nombre: string,
    public descripcion: string,
    public ubicacion: string,
    public categoria: string,
    public activo: boolean = true,
    public fechaCreacion?: Date,
    public calificacion?: number
  ) {}

  static fromObject(object: {[key: string]: any}): LugarTuristicoEntity {
    const { id, nombre, descripcion, ubicacion, categoria, activo, fechaCreacion, calificacion } = object;
    
    if (!id) throw 'Id is required';
    if (!nombre) throw 'Nombre is required';
    if (!descripcion) throw 'Descripcion is required';
    if (!ubicacion) throw 'Ubicacion is required';
    if (!categoria) throw 'Categoria is required';
    
    return new LugarTuristicoEntity(
      id, 
      nombre, 
      descripcion, 
      ubicacion, 
      categoria, 
      activo ?? true,
      fechaCreacion ? new Date(fechaCreacion) : new Date(),
      calificacion
    );
  }
}
