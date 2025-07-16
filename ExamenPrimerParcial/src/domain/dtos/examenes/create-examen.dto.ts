export class CreateExamenDto {

  private constructor(
    public readonly titulo: string,
    public readonly claseId: string,
    public readonly fechaLimite?: Date
  ) {}

  static create(props: {[key: string]: any}): [string?, CreateExamenDto?] {
    const { titulo, claseId, fechaLimite } = props;

    if (!titulo) return ['Titulo is required', undefined];
    if (!claseId) return ['Clase Id is required', undefined];

    let newFechaLimite;
    if (fechaLimite) {
      newFechaLimite = new Date(fechaLimite);
      if (newFechaLimite.toString() === 'Invalid Date') {
        return ['Fecha limite must be a valid date', undefined];
      }
      if (newFechaLimite <= new Date()) {
        return ['Fecha limite must be in the future', undefined];
      }
    }

    return [undefined, new CreateExamenDto(titulo, claseId, newFechaLimite)];
  }
}
