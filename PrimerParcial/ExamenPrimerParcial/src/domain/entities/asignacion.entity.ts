export class AsignacionEntity {

  constructor(
    public id: string,
    public examenId: string,
    public estudianteId: string,
    public criterio: string,
    public descripcion: string,
    public puntuacion: number,
    public puntuacionMaxima: number,
    public comentarios: string,
    public fechaCalificacion: Date = new Date()
  ) {}

  get porcentajeObtenido(): number {
    return (this.puntuacion / this.puntuacionMaxima) * 100;
  }

  get estaAprobada(): boolean {
    return this.porcentajeObtenido >= 70; // 70% para aprobar
  }

  get nivelRendimiento(): string {
    if (this.porcentajeObtenido >= 90) return 'Excelente';
    if (this.porcentajeObtenido >= 80) return 'Bueno';
    if (this.porcentajeObtenido >= 70) return 'Regular';
    return 'Deficiente';
  }

  public actualizarPuntuacion(nuevaPuntuacion: number, nuevosComentarios?: string): void {
    if (nuevaPuntuacion < 0 || nuevaPuntuacion > this.puntuacionMaxima) {
      throw 'Puntuacion must be between 0 and puntuacion maxima';
    }
    this.puntuacion = nuevaPuntuacion;
    if (nuevosComentarios) {
      this.comentarios = nuevosComentarios;
    }
    this.fechaCalificacion = new Date();
  }

  public static fromObject(object: {[key: string]: any}): AsignacionEntity {
    const { id, examenId, estudianteId, criterio, descripcion, puntuacion, puntuacionMaxima, comentarios, fechaCalificacion } = object;

    if (!id) throw 'Id is required';
    if (!examenId) throw 'Examen Id is required';
    if (!estudianteId) throw 'Estudiante Id is required';
    if (!criterio) throw 'Criterio is required';
    if (puntuacion === undefined || puntuacion === null) throw 'Puntuacion is required';
    if (puntuacionMaxima === undefined || puntuacionMaxima === null) throw 'Puntuacion maxima is required';

    if (puntuacion < 0) throw 'Puntuacion cannot be negative';
    if (puntuacionMaxima <= 0) throw 'Puntuacion maxima must be positive';
    if (puntuacion > puntuacionMaxima) throw 'Puntuacion cannot exceed puntuacion maxima';

    return new AsignacionEntity(
      id,
      examenId,
      estudianteId,
      criterio,
      descripcion || '',
      puntuacion,
      puntuacionMaxima,
      comentarios || '',
      fechaCalificacion ? new Date(fechaCalificacion) : new Date()
    );
  }
}
