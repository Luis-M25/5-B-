export interface Clase {
  id: number;
  nombre: string;
  descripcion: string;
  profesor: string;
  creditos: number;
  horario: string;
}

export class ClasesDatasource {
  private static clases: Clase[] = [
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

  static getAll(): Clase[] {
    return this.clases;
  }

  static getById(id: number): Clase | undefined {
    return this.clases.find(clase => clase.id === id);
  }

  static create(clase: Omit<Clase, 'id'>): Clase {
    const newId = Math.max(...this.clases.map(c => c.id)) + 1;
    const newClase: Clase = { ...clase, id: newId };
    this.clases.push(newClase);
    return newClase;
  }

  static update(id: number, clase: Partial<Clase>): Clase | null {
    const index = this.clases.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    this.clases[index] = { ...this.clases[index], ...clase };
    return this.clases[index];
  }

  static delete(id: number): boolean {
    const index = this.clases.findIndex(c => c.id === id);
    if (index === -1) return false;
    
    this.clases.splice(index, 1);
    return true;
  }
}