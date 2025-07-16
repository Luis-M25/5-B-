export enum EstadoEvaluacion {
  EXCELENTE = 'excelente',
  BUENO = 'bueno',
  REGULAR = 'regular',
  DEFICIENTE = 'deficiente'
}

export interface ResumenEvaluacion {
  promedioGeneral: number;
  totalAsignaciones: number;
  asignacionesCompletadas: number;
  estadoGeneral: EstadoEvaluacion;
  mejorCalificacion: number;
  peorCalificacion: number;
}

export class ReporteEntity {

  constructor(
    public id: string,
    public claseId: string,
    public estudianteId: string,
    public nombreEstudiante: string,
    public emailEstudiante: string,
    public nombreClase: string,
    public instructor: string,
    public resumenEvaluacion: ResumenEvaluacion,
    public detallesAsignaciones: DetalleAsignacion[],
    public fechaGeneracion: Date = new Date()
  ) {}

  get tieneDatos(): boolean {
    return this.detallesAsignaciones.length > 0;
  }

  get estaAprobado(): boolean {
    return this.resumenEvaluacion.promedioGeneral >= 70;
  }

  get porcentajeCompletado(): number {
    if (this.resumenEvaluacion.totalAsignaciones === 0) return 0;
    return (this.resumenEvaluacion.asignacionesCompletadas / this.resumenEvaluacion.totalAsignaciones) * 100;
  }

  get tendenciaRendimiento(): string {
    if (this.detallesAsignaciones.length < 2) return 'Insuficientes datos';
    
    const mitad = Math.floor(this.detallesAsignaciones.length / 2);
    const primerasMitad = this.detallesAsignaciones.slice(0, mitad);
    const segundaMitad = this.detallesAsignaciones.slice(mitad);
    
    const promedioPrimera = primerasMitad.reduce((acc, det) => acc + det.porcentajeObtenido, 0) / primerasMitad.length;
    const promedioSegunda = segundaMitad.reduce((acc, det) => acc + det.porcentajeObtenido, 0) / segundaMitad.length;
    
    if (promedioSegunda > promedioPrimera + 5) return 'Mejorando';
    if (promedioSegunda < promedioPrimera - 5) return 'Declinando';
    return 'Estable';
  }

  public agregarDetalleAsignacion(detalle: DetalleAsignacion): void {
    this.detallesAsignaciones.push(detalle);
    this.recalcularResumen();
  }

  private recalcularResumen(): void {
    if (this.detallesAsignaciones.length === 0) return;

    const puntuaciones = this.detallesAsignaciones.map(d => d.porcentajeObtenido);
    const promedio = puntuaciones.reduce((acc, p) => acc + p, 0) / puntuaciones.length;
    
    this.resumenEvaluacion = {
      promedioGeneral: promedio,
      totalAsignaciones: this.detallesAsignaciones.length,
      asignacionesCompletadas: this.detallesAsignaciones.length,
      estadoGeneral: this.determinarEstado(promedio),
      mejorCalificacion: Math.max(...puntuaciones),
      peorCalificacion: Math.min(...puntuaciones)
    };
  }

  private determinarEstado(promedio: number): EstadoEvaluacion {
    if (promedio >= 90) return EstadoEvaluacion.EXCELENTE;
    if (promedio >= 80) return EstadoEvaluacion.BUENO;
    if (promedio >= 70) return EstadoEvaluacion.REGULAR;
    return EstadoEvaluacion.DEFICIENTE;
  }

  public static fromObject(object: {[key: string]: any}): ReporteEntity {
    const { 
      id, claseId, estudianteId, nombreEstudiante, emailEstudiante, 
      nombreClase, instructor, resumenEvaluacion, detallesAsignaciones, fechaGeneracion 
    } = object;

    if (!id) throw 'Id is required';
    if (!claseId) throw 'Clase Id is required';
    if (!estudianteId) throw 'Estudiante Id is required';
    if (!nombreEstudiante) throw 'Nombre estudiante is required';
    if (!emailEstudiante) throw 'Email estudiante is required';
    if (!nombreClase) throw 'Nombre clase is required';
    if (!instructor) throw 'Instructor is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailEstudiante)) throw 'Email format is invalid';

    let newFechaGeneracion = new Date();
    if (fechaGeneracion) {
      newFechaGeneracion = new Date(fechaGeneracion);
      if (isNaN(newFechaGeneracion.getTime())) {
        throw 'Fecha generacion is not a valid date';
      }
    }

    const detalles = detallesAsignaciones?.map((det: any) => DetalleAsignacion.fromObject(det)) || [];

    return new ReporteEntity(
      id,
      claseId,
      estudianteId,
      nombreEstudiante,
      emailEstudiante,
      nombreClase,
      instructor,
      resumenEvaluacion || {
        promedioGeneral: 0,
        totalAsignaciones: 0,
        asignacionesCompletadas: 0,
        estadoGeneral: EstadoEvaluacion.DEFICIENTE,
        mejorCalificacion: 0,
        peorCalificacion: 0
      },
      detalles,
      newFechaGeneracion
    );
  }
}

export class DetalleAsignacion {
  constructor(
    public examenId: string,
    public tituloExamen: string,
    public criterio: string,
    public descripcion: string,
    public puntuacion: number,
    public puntuacionMaxima: number,
    public comentarios: string,
    public fechaCalificacion: Date
  ) {}

  get porcentajeObtenido(): number {
    return (this.puntuacion / this.puntuacionMaxima) * 100;
  }

  get nivelRendimiento(): string {
    if (this.porcentajeObtenido >= 90) return 'Excelente';
    if (this.porcentajeObtenido >= 80) return 'Bueno';
    if (this.porcentajeObtenido >= 70) return 'Regular';
    return 'Deficiente';
  }

  get estaAprobado(): boolean {
    return this.porcentajeObtenido >= 70;
  }

  public static fromObject(object: {[key: string]: any}): DetalleAsignacion {
    const { 
      examenId, tituloExamen, criterio, descripcion, 
      puntuacion, puntuacionMaxima, comentarios, fechaCalificacion 
    } = object;

    if (!examenId) throw 'Examen Id is required';
    if (!tituloExamen) throw 'Titulo examen is required';
    if (!criterio) throw 'Criterio is required';
    if (puntuacion === undefined || puntuacion === null) throw 'Puntuacion is required';
    if (puntuacionMaxima === undefined || puntuacionMaxima === null) throw 'Puntuacion maxima is required';

    if (puntuacion < 0) throw 'Puntuacion cannot be negative';
    if (puntuacionMaxima <= 0) throw 'Puntuacion maxima must be positive';
    if (puntuacion > puntuacionMaxima) throw 'Puntuacion cannot exceed puntuacion maxima';

    let newFechaCalificacion = new Date();
    if (fechaCalificacion) {
      newFechaCalificacion = new Date(fechaCalificacion);
      if (isNaN(newFechaCalificacion.getTime())) {
        throw 'Fecha calificacion is not a valid date';
      }
    }

    return new DetalleAsignacion(
      examenId,
      tituloExamen,
      criterio,
      descripcion || '',
      puntuacion,
      puntuacionMaxima,
      comentarios || '',
      newFechaCalificacion
    );
  }
}
