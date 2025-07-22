import { ClaseRepository } from '../../domain/repositories/clase.repository';
import { ClaseEntity } from '../../domain/entities/clase.entity';
import { UpdateClaseDto } from '../../domain/dtos';

export class ClaseRepositoryImpl implements ClaseRepository {
  getAll(): Promise<ClaseEntity[]> {
      throw new Error('Method not implemented.');
  }
  updateById(updateClaseDto: UpdateClaseDto): Promise<ClaseEntity> {
      throw new Error('Method not implemented.');
  }
  deleteById(id: string): Promise<ClaseEntity> {
      throw new Error('Method not implemented.');
  }
  findByInstructor(instructor: string): Promise<ClaseEntity[]> {
      throw new Error('Method not implemented.');
  }
  incrementarEstudiantes(id: string): Promise<void> {
      throw new Error('Method not implemented.');
  }
  decrementarEstudiantes(id: string): Promise<void> {
      throw new Error('Method not implemented.');
  }
  private clases: ClaseEntity[] = [];
  private nextId = 1;

  async create(clase: Omit<ClaseEntity, 'id'>): Promise<ClaseEntity> {
    const nuevaClase: ClaseEntity = {
      ...clase,
      id: (this.nextId++).toString()
    };
    this.clases.push(nuevaClase);
    return nuevaClase;
  }

  async findById(id: string): Promise<ClaseEntity> {
    const clase = this.clases.find(c => c.id === id);
    if (!clase) {
      throw new Error(`Clase with id ${id} not found`);
    }
    return clase;
  }

  async findAll(): Promise<ClaseEntity[]> {
    return [...this.clases];
  }

  async update(id: string, clase: Partial<ClaseEntity>): Promise<ClaseEntity | null> {
    const index = this.clases.findIndex(c => c.id === id);
    if (index === -1) {
      return null;
    }
    
    const updatedClase = { ...this.clases[index], ...clase };
    // Ensure required boolean fields have default values
    if (updatedClase.estaActiva === undefined) {
      updatedClase.estaActiva = false;
    }
    if (updatedClase.duracionEnDias === undefined) {
      updatedClase.duracionEnDias = 0;
    }
    
    this.clases[index] = updatedClase as ClaseEntity;
    return this.clases[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.clases.findIndex(c => c.id === id);
    if (index === -1) {
      return false;
    }
    
    this.clases.splice(index, 1);
    return true;
  }
}