export class CreateAsignacionDto {

  private constructor(
    public readonly examenId: string,
    public readonly estudianteId: string,
    public readonly criterio: string,
    public readonly descripcion: string,
    public readonly puntuacion: number,
    public readonly puntuacionMaxima: number,
    public readonly comentarios: string
  ) {}

  static create(props: {[key: string]: any}): [string?, CreateAsignacionDto?] {
    const { examenId, estudianteId, criterio, descripcion, puntuacion, puntuacionMaxima, comentarios } = props;

    if (!examenId) return ['Examen Id is required', undefined];
    if (!estudianteId) return ['Estudiante Id is required', undefined];
    if (!criterio) return ['Criterio is required', undefined];
    if (puntuacion === undefined || puntuacion === null) return ['Puntuacion is required', undefined];
    if (puntuacionMaxima === undefined || puntuacionMaxima === null) return ['Puntuacion maxima is required', undefined];

    if (puntuacion < 0) return ['Puntuacion cannot be negative', undefined];
    if (puntuacionMaxima <= 0) return ['Puntuacion maxima must be positive', undefined];
    if (puntuacion > puntuacionMaxima) return ['Puntuacion cannot exceed puntuacion maxima', undefined];

    return [undefined, new CreateAsignacionDto(
      examenId,
      estudianteId,
      criterio,
      descripcion || '',
      puntuacion,
      puntuacionMaxima,
      comentarios || ''
    )];
  }
}
