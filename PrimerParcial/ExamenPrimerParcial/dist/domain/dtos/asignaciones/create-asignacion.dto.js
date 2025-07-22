"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAsignacionDto = void 0;
class CreateAsignacionDto {
    constructor(examenId, estudianteId, criterio, descripcion, puntuacion, puntuacionMaxima, comentarios) {
        this.examenId = examenId;
        this.estudianteId = estudianteId;
        this.criterio = criterio;
        this.descripcion = descripcion;
        this.puntuacion = puntuacion;
        this.puntuacionMaxima = puntuacionMaxima;
        this.comentarios = comentarios;
    }
    static create(props) {
        const { examenId, estudianteId, criterio, descripcion, puntuacion, puntuacionMaxima, comentarios } = props;
        if (!examenId)
            return ['Examen Id is required', undefined];
        if (!estudianteId)
            return ['Estudiante Id is required', undefined];
        if (!criterio)
            return ['Criterio is required', undefined];
        if (puntuacion === undefined || puntuacion === null)
            return ['Puntuacion is required', undefined];
        if (puntuacionMaxima === undefined || puntuacionMaxima === null)
            return ['Puntuacion maxima is required', undefined];
        if (puntuacion < 0)
            return ['Puntuacion cannot be negative', undefined];
        if (puntuacionMaxima <= 0)
            return ['Puntuacion maxima must be positive', undefined];
        if (puntuacion > puntuacionMaxima)
            return ['Puntuacion cannot exceed puntuacion maxima', undefined];
        return [undefined, new CreateAsignacionDto(examenId, estudianteId, criterio, descripcion || '', puntuacion, puntuacionMaxima, comentarios || '')];
    }
}
exports.CreateAsignacionDto = CreateAsignacionDto;
