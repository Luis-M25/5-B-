export class ClaseEntity {

  constructor(
    public id: string,
    public nombreClase: string,
    public numeroEstudiantes: number,
    public instructor: string,
    public descripcion: string,
    public startDate: Date,
    public endDate: Date,
    public fechaCreacion: Date = new Date(),
    public fechaActualizacion: Date = new Date()
  ) {}

  get estaActiva(): boolean {
    const ahora = new Date();
    return ahora >= this.startDate && ahora <= this.endDate;
  }

  get duracionEnDias(): number {
    const diferencia = this.endDate.getTime() - this.startDate.getTime();
    return Math.ceil(diferencia / (1000 * 3600 * 24));
  }

  public static fromObject(object: {[key: string]: any}): ClaseEntity {
    const { id, nombreClase, numeroEstudiantes, instructor, descripcion, startDate, endDate, fechaCreacion, fechaActualizacion } = object;

    if (!id) throw 'Id is required';
    if (!nombreClase) throw 'Nombre de clase is required';
    if (numeroEstudiantes < 0) throw 'Numero de estudiantes must be >= 0';
    if (!instructor) throw 'Instructor is required';
    if (!startDate) throw 'Start date is required';
    if (!endDate) throw 'End date is required';

    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);

    if (isNaN(newStartDate.getTime())) throw 'Start date is not valid';
    if (isNaN(newEndDate.getTime())) throw 'End date is not valid';
    if (newStartDate >= newEndDate) throw 'Start date must be before end date';

    return new ClaseEntity(
      id,
      nombreClase,
      numeroEstudiantes || 0,
      instructor,
      descripcion || '',
      newStartDate,
      newEndDate,
      fechaCreacion ? new Date(fechaCreacion) : new Date(),
      fechaActualizacion ? new Date(fechaActualizacion) : new Date()
    );
  }
}
