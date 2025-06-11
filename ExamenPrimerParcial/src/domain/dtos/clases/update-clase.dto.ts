export class UpdateClaseDto {

  private constructor(
    public readonly id: string,
    public readonly nombreClase?: string,
    public readonly instructor?: string,
    public readonly descripcion?: string,
    public readonly startDate?: Date,
    public readonly endDate?: Date
  ) {}

  get values() {
    const returnObj: {[key: string]: any} = {};

    if (this.nombreClase) returnObj.nombreClase = this.nombreClase;
    if (this.instructor) returnObj.instructor = this.instructor;
    if (this.descripcion) returnObj.descripcion = this.descripcion;
    if (this.startDate) returnObj.startDate = this.startDate;
    if (this.endDate) returnObj.endDate = this.endDate;

    return returnObj;
  }

  static create(props: {[key: string]: any}): [string?, UpdateClaseDto?] {
    const { id, nombreClase, instructor, descripcion, startDate, endDate } = props;

    if (!id) return ['Id is required', undefined];

    let newStartDate, newEndDate;

    if (startDate) {
      newStartDate = new Date(startDate);
      if (newStartDate.toString() === 'Invalid Date') {
        return ['Start date must be a valid date', undefined];
      }
    }

    if (endDate) {
      newEndDate = new Date(endDate);
      if (newEndDate.toString() === 'Invalid Date') {
        return ['End date must be a valid date', undefined];
      }
    }

    if (newStartDate && newEndDate && newStartDate >= newEndDate) {
      return ['Start date must be before end date', undefined];
    }

    return [undefined, new UpdateClaseDto(id, nombreClase, instructor, descripcion, newStartDate, newEndDate)];
  }
}
