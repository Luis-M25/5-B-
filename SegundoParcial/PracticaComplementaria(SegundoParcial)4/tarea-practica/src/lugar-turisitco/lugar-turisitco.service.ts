import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLugarTurisitcoDto } from './dto/create-lugar-turisitco.dto';
import { UpdateLugarTurisitcoDto } from './dto/update-lugar-turisitco.dto';
import { LugarTurisitco } from './entities/lugar-turisitco.entity';

@Injectable()
export class LugarTurisitcoService {
  constructor(
    @InjectRepository(LugarTurisitco)
    private readonly lugarTurisitcoRepository: Repository<LugarTurisitco>,
  ) {}

  async create(createLugarTurisitcoDto: CreateLugarTurisitcoDto): Promise<LugarTurisitco> {
    const lugarTurisitco = this.lugarTurisitcoRepository.create(createLugarTurisitcoDto);
    return await this.lugarTurisitcoRepository.save(lugarTurisitco);
  }

  async findAll(): Promise<LugarTurisitco[]> {
    return await this.lugarTurisitcoRepository.find({
      order: { valoracion: 'DESC', fechaCreacion: 'DESC' },
    });
  }

  async findOne(id: number): Promise<LugarTurisitco> {
    const lugarTurisitco = await this.lugarTurisitcoRepository.findOne({
      where: { id },
    });

    if (!lugarTurisitco) {
      throw new NotFoundException(`Lugar turístico con ID ${id} no encontrado`);
    }

    return lugarTurisitco;
  }

  async update(id: number, updateLugarTurisitcoDto: UpdateLugarTurisitcoDto): Promise<LugarTurisitco> {
    const lugarTurisitco = await this.findOne(id);
    
    Object.assign(lugarTurisitco, updateLugarTurisitcoDto);
    
    return await this.lugarTurisitcoRepository.save(lugarTurisitco);
  }

  async remove(id: number): Promise<void> {
    const lugarTurisitco = await this.findOne(id);
    await this.lugarTurisitcoRepository.remove(lugarTurisitco);
  }

  // Métodos adicionales específicos para lugares turísticos
  async findByCategoria(categoria: string): Promise<LugarTurisitco[]> {
    return await this.lugarTurisitcoRepository.find({
      where: { categoria },
      order: { valoracion: 'DESC' },
    });
  }

  async findByUbicacion(ubicacion: string): Promise<LugarTurisitco[]> {
    return await this.lugarTurisitcoRepository
      .createQueryBuilder('lugar')
      .where('lugar.ubicacion ILIKE :ubicacion', { ubicacion: `%${ubicacion}%` })
      .orderBy('lugar.valoracion', 'DESC')
      .getMany();
  }

  async findNearby(latitud: number, longitud: number, radio: number = 10): Promise<LugarTurisitco[]> {
    return await this.lugarTurisitcoRepository
      .createQueryBuilder('lugar')
      .where(
        `ST_DWithin(
          ST_Point(lugar.longitud, lugar.latitud)::geography,
          ST_Point(:longitud, :latitud)::geography,
          :radio * 1000
        )`,
        { latitud, longitud, radio }
      )
      .orderBy('lugar.valoracion', 'DESC')
      .getMany();
  }
}
