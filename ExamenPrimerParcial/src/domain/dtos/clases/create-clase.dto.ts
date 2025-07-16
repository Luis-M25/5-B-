export class CreateClaseDto {

  private constructor(
    public readonly nombreClase: string,
    public readonly instructor: string,
    public readonly descripcion: string,
    public readonly startDate: Date,
    public readonly endDate: Date
  ) {}

  static create(props: {[key: string]: any}): [string?, CreateClaseDto?] {
    const { nombreClase, instructor, descripcion, startDate, endDate } = props;

    if (!nombreClase) return ['Nombre de clase is required', undefined];
    if (!instructor) return ['Instructor is required', undefined];
    if (!startDate) return ['Start date is required', undefined];
    if (!endDate) return ['End date is required', undefined];

    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);

    if (newStartDate.toString() === 'Invalid Date') {
      return ['Start date must be a valid date', undefined];
    }

    if (newEndDate.toString() === 'Invalid Date') {
      return ['End date must be a valid date', undefined];
    }

    if (newStartDate >= newEndDate) {
      return ['Start date must be before end date', undefined];
    }

    return [undefined, new CreateClaseDto(nombreClase, instructor, descripcion || '', newStartDate, newEndDate)];
  }
}
