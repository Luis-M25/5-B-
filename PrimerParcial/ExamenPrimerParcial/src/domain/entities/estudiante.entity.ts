export class EstudianteEntity {

  constructor(
    public id: string,
    public claseId: string,
    public nombreEstudiante: string,
    public email: string,
    public fechaMatricula: Date = new Date(),
    public activo: boolean = true
  ) {}

  get emailValido(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  public desactivar(): void {
    this.activo = false;
  }

  public activar(): void {
    this.activo = true;
  }

  public static fromObject(object: {[key: string]: any}): EstudianteEntity {
    const { id, claseId, nombreEstudiante, email, fechaMatricula, activo } = object;

    if (!id) throw 'Id is required';
    if (!claseId) throw 'Clase Id is required';
    if (!nombreEstudiante) throw 'Nombre de estudiante is required';
    if (!email) throw 'Email is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw 'Email format is invalid';

    return new EstudianteEntity(
      id,
      claseId,
      nombreEstudiante,
      email,
      fechaMatricula ? new Date(fechaMatricula) : new Date(),
      activo !== undefined ? activo : true
    );
  }
}
