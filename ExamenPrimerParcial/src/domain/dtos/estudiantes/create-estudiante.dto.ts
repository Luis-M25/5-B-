export class CreateEstudianteDto {

  private constructor(
    public readonly claseId: string,
    public readonly nombreEstudiante: string,
    public readonly email: string
  ) {}

  static create(props: {[key: string]: any}): [string?, CreateEstudianteDto?] {
    const { claseId, nombreEstudiante, email } = props;

    if (!claseId) return ['Clase Id is required', undefined];
    if (!nombreEstudiante) return ['Nombre de estudiante is required', undefined];
    if (!email) return ['Email is required', undefined];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return ['Email format is invalid', undefined];
    }

    return [undefined, new CreateEstudianteDto(claseId, nombreEstudiante, email)];
  }
}
