"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClasesDatasource = void 0;
class ClasesDatasource {
    static getAll() {
        return this.clases;
    }
    static getById(id) {
        return this.clases.find(clase => clase.id === id);
    }
    static create(clase) {
        const newId = Math.max(...this.clases.map(c => c.id)) + 1;
        const newClase = { ...clase, id: newId };
        this.clases.push(newClase);
        return newClase;
    }
    static update(id, clase) {
        const index = this.clases.findIndex(c => c.id === id);
        if (index === -1)
            return null;
        this.clases[index] = { ...this.clases[index], ...clase };
        return this.clases[index];
    }
    static delete(id) {
        const index = this.clases.findIndex(c => c.id === id);
        if (index === -1)
            return false;
        this.clases.splice(index, 1);
        return true;
    }
}
exports.ClasesDatasource = ClasesDatasource;
ClasesDatasource.clases = [
    {
        id: 1,
        nombre: "Programación Web",
        descripcion: "Desarrollo de aplicaciones web con Node.js y TypeScript",
        profesor: "Dr. García",
        creditos: 4,
        horario: "Lunes y Miércoles 10:00-12:00"
    },
    {
        id: 2,
        nombre: "Base de Datos",
        descripcion: "Diseño y administración de bases de datos relacionales",
        profesor: "Dra. López",
        creditos: 3,
        horario: "Martes y Jueves 14:00-16:00"
    },
    {
        id: 3,
        nombre: "Algoritmos",
        descripcion: "Estructuras de datos y análisis de algoritmos",
        profesor: "Dr. Martínez",
        creditos: 4,
        horario: "Lunes, Miércoles y Viernes 08:00-10:00"
    }
];
