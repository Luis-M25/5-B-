"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateExamenDto = void 0;
class CreateExamenDto {
    constructor(titulo, claseId, fechaLimite) {
        this.titulo = titulo;
        this.claseId = claseId;
        this.fechaLimite = fechaLimite;
    }
    static create(props) {
        const { titulo, claseId, fechaLimite } = props;
        if (!titulo)
            return ['Titulo is required', undefined];
        if (!claseId)
            return ['Clase Id is required', undefined];
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
exports.CreateExamenDto = CreateExamenDto;
