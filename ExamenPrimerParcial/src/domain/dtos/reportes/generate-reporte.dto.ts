export class GenerateReporteDto {

  private constructor(
    public readonly claseId: string,
    public readonly estudianteId: string,
    public readonly tipoReporte: TipoReporte
  ) {}

  static create(props: {[key: string]: any}): [string?, GenerateReporteDto?] {
    const { claseId, estudianteId, tipoReporte } = props;

    if (!claseId) return ['Clase Id is required', undefined];
    if (!estudianteId) return ['Estudiante Id is required', undefined];
    if (!tipoReporte) return ['Tipo de reporte is required', undefined];

    if (!Object.values(TipoReporte).includes(tipoReporte)) {
      return ['Tipo de reporte must be a valid value', undefined];
    }

    return [undefined, new GenerateReporteDto(claseId, estudianteId, tipoReporte)];
  }
}

export enum TipoReporte {
  PDF = 'pdf',
  EXCEL = 'excel',
  JSON = 'json'
}
