"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoReporte = exports.GenerateReporteDto = void 0;
class GenerateReporteDto {
    constructor(claseId, estudianteId, tipoReporte) {
        this.claseId = claseId;
        this.estudianteId = estudianteId;
        this.tipoReporte = tipoReporte;
    }
    static create(props) {
        const { claseId, estudianteId, tipoReporte } = props;
        if (!claseId)
            return ['Clase Id is required', undefined];
        if (!estudianteId)
            return ['Estudiante Id is required', undefined];
        if (!tipoReporte)
            return ['Tipo de reporte is required', undefined];
        if (!Object.values(TipoReporte).includes(tipoReporte)) {
            return ['Tipo de reporte must be a valid value', undefined];
        }
        return [undefined, new GenerateReporteDto(claseId, estudianteId, tipoReporte)];
    }
}
exports.GenerateReporteDto = GenerateReporteDto;
var TipoReporte;
(function (TipoReporte) {
    TipoReporte["PDF"] = "pdf";
    TipoReporte["EXCEL"] = "excel";
    TipoReporte["JSON"] = "json";
})(TipoReporte || (exports.TipoReporte = TipoReporte = {}));
