import { Injectable } from '@nestjs/common';
import { DataPersistenceService } from '../../../../shared/data-persistence.service';
import { CreateSurtidorInput, UpdateSurtidorInput, SurtidorFilterInput } from '../../shared/inputs';
import { Surtidor as SurtidorInterface, SurtidorFilter } from '../../../../shared/interfaces';

@Injectable()
export class SurtidoresService {
  constructor(private readonly dataService: DataPersistenceService) {}

  async findAll(filterInput?: SurtidorFilterInput): Promise<SurtidorInterface[]> {
    const filter: SurtidorFilter = {};
    
    if (filterInput?.estado) filter.estado = filterInput.estado;
    if (filterInput?.ubicacion) filter.ubicacion = filterInput.ubicacion;
    if (filterInput?.tipoGasolina) filter.tipoGasolina = filterInput.tipoGasolina;
    
    return await this.dataService.getAllSurtidores(filter);
  }

  async findDisponibles(): Promise<SurtidorInterface[]> {
    const filter: SurtidorFilter = { estado: 'disponible' };
    return await this.dataService.getAllSurtidores(filter);
  }

  async findOne(id: string): Promise<SurtidorInterface | null> {
    return await this.dataService.getSurtidorById(id);
  }

  async create(createSurtidorInput: CreateSurtidorInput): Promise<SurtidorInterface> {
    const surtidorData = {
      ...createSurtidorInput,
      estado: createSurtidorInput.estado as any
    };
    return await this.dataService.createSurtidor(surtidorData);
  }

  async update(id: string, updateSurtidorInput: UpdateSurtidorInput): Promise<SurtidorInterface | null> {
    const updateData: any = {};
    if (updateSurtidorInput.nombre) updateData.nombre = updateSurtidorInput.nombre;
    if (updateSurtidorInput.estado) updateData.estado = updateSurtidorInput.estado;
    if (updateSurtidorInput.ubicacion) updateData.ubicacion = updateSurtidorInput.ubicacion;
    if (updateSurtidorInput.capacidadMaxima !== undefined) updateData.capacidadMaxima = updateSurtidorInput.capacidadMaxima;
    if (updateSurtidorInput.combustibleActual !== undefined) updateData.combustibleActual = updateSurtidorInput.combustibleActual;
    if (updateSurtidorInput.tiposGasolinaDisponibles) updateData.tiposGasolinaDisponibles = updateSurtidorInput.tiposGasolinaDisponibles;
    
    return await this.dataService.updateSurtidor(id, updateData);
  }

  async updateEstado(id: string, estado: string): Promise<SurtidorInterface | null> {
    const validStates = ['disponible', 'ocupado', 'mantenimiento', 'fuera_servicio'];
    if (!validStates.includes(estado)) {
      throw new Error('Estado no válido');
    }
    
    return await this.dataService.updateSurtidor(id, { estado: estado as any });
  }
}
