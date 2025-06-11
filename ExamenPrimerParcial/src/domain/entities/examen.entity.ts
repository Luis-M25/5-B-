export enum EstadoExamen {
  PENDIENTE = 'pendiente',
  EN_PROGRESO = 'en_progreso', 
  COMPLETADO = 'completado',
  CANCELADO = 'cancelado'
}

export class ExamenEntity {

  constructor(
    public id: string,
    public titulo: string,
    public claseId: string,
    public estado: EstadoExamen,
    public fechaCreacion: Date = new Date(),
    public fechaLimite?: Date
  ) {}

  get estaVencido(): boolean {
    if (!this.fechaLimite) return false;
    return new Date() > this.fechaLimite;
  }

  get puedeSerEditado(): boolean {
    return this.estado === EstadoExamen.PENDIENTE && !this.estaVencido;
  }

  public publicar(): void {
    if (this.estado === EstadoExamen.PENDIENTE) {
      this.estado = EstadoExamen.EN_PROGRESO;
    }
  }

  public completar(): void {
    if (this.estado === EstadoExamen.EN_PROGRESO) {
      this.estado = EstadoExamen.COMPLETADO;
    }
  }

  public cancelar(): void {
    this.estado = EstadoExamen.CANCELADO;
  }

  public static fromObject(object: {[key: string]: any}): ExamenEntity {
    const { id, titulo, claseId, estado, fechaCreacion, fechaLimite } = object;

    if (!id) throw 'Id is required';
    if (!titulo) throw 'Titulo is required';
    if (!claseId) throw 'Clase Id is required';
    if (!estado) throw 'Estado is required';

    if (!Object.values(EstadoExamen).includes(estado)) {
      throw 'Estado must be a valid value';
    }

    let newFechaLimite;
    if (fechaLimite) {
      newFechaLimite = new Date(fechaLimite);
      if (isNaN(newFechaLimite.getTime())) {
        throw 'Fecha limite is not a valid date';
      }
    }

    return new ExamenEntity(
      id,
      titulo,
      claseId,
      estado,
      fechaCreacion ? new Date(fechaCreacion) : new Date(),
      newFechaLimite
    );
  }
}
