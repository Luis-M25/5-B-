import { CreateLugarTuristicoDto } from '../../domain';
import { LugarTuristicoDatasource } from '../../domain/datasources/lugar-turistico.datasource';
import { LugarTuristicoEntity } from '../../domain/entities/lugar-turistico.entity';

export class LugarTuristicoDatasourceImpl implements LugarTuristicoDatasource {
    async findById(id: number): Promise<LugarTuristicoEntity> {
        const lugar = await this.getById(id);
        if (!lugar) {
            throw new Error(`Lugar turístico with id ${id} not found`);
        }
        return lugar;
    }

    async deleteById(id: number): Promise<LugarTuristicoEntity> {
        const lugar = await this.getById(id);
        if (!lugar) {
            throw new Error(`Lugar turístico with id ${id} not found`);
        }
        await this.delete(id);
        return lugar;
    }

    async updateById(id: number, updateLugarTuristicoDto: Partial<CreateLugarTuristicoDto>): Promise<LugarTuristicoEntity> {
        const updatedLugar = await this.update(id, updateLugarTuristicoDto);
        if (!updatedLugar) {
            throw new Error(`Lugar turístico with id ${id} not found`);
        }
        return updatedLugar;
    }

    async buscarPorCategoria(categoria: string): Promise<LugarTuristicoEntity[]> {
        return this.lugares.filter(lugar => 
            lugar.categoria?.toLowerCase() === categoria.toLowerCase()
        );
    }

  private lugares: LugarTuristicoEntity[] = [];

  async create(lugar: Partial<LugarTuristicoEntity>): Promise<LugarTuristicoEntity> {
    const newLugar = { ...lugar, id: Date.now().toString() } as LugarTuristicoEntity;
    this.lugares.push(newLugar);
    return newLugar;
  }

  async getAll(): Promise<LugarTuristicoEntity[]> {
    return this.lugares;
  }

  async getById(id: number): Promise<LugarTuristicoEntity | null> {
    return this.lugares.find(lugar => lugar.id === id.toString()) || null;
  }

  async update(id: number, lugar: Partial<LugarTuristicoEntity>): Promise<LugarTuristicoEntity | null> {
    const index = this.lugares.findIndex(l => l.id === id.toString());
    if (index === -1) return null;
    
    this.lugares[index] = { ...this.lugares[index], ...lugar };
    return this.lugares[index];
  }

  async delete(id: number): Promise<boolean> {
    const index = this.lugares.findIndex(l => l.id === id.toString());
    if (index === -1) return false;
    
    this.lugares.splice(index, 1);
    return true;
  }
}