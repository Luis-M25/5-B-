import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLugarturisticoDto } from './dto/create-lugarturistico.dto';
import { UpdateLugarturisticoDto } from './dto/update-lugarturistico.dto';
import { Lugarturistico } from './entities/lugarturistico.entity';

@Injectable()
export class LugarturisticoService {
  constructor(
    @InjectRepository(Lugarturistico)
    private readonly lugarturisticoRepository: Repository<Lugarturistico>,
  ) {}

  async create(createLugarturisticoDto: CreateLugarturisticoDto): Promise<Lugarturistico> {
    try {
      const lugarTuristico = this.lugarturisticoRepository.create({
        ...createLugarturisticoDto,
        activo: createLugarturisticoDto.activo ?? true,
      });
      return await this.lugarturisticoRepository.save(lugarTuristico);
    } catch (error) {
      throw new BadRequestException('Error al crear el lugar turístico');
    }
  }

  async findAll(): Promise<Lugarturistico[]> {
    return await this.lugarturisticoRepository.find({
      where: { activo: true },
      relations: ['valoraciones'],
      order: { fechaCreacion: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Lugarturistico> {
    const lugarTuristico = await this.lugarturisticoRepository.findOne({
      where: { id, activo: true },
      relations: ['valoraciones', 'busquedas'],
    });

    if (!lugarTuristico) {
      throw new NotFoundException(`Lugar turístico con ID ${id} no encontrado`);
    }

    return lugarTuristico;
  }

  async findByCategory(categoria: string): Promise<Lugarturistico[]> {
    return await this.lugarturisticoRepository.find({
      where: { categoria, activo: true },
      relations: ['valoraciones'],
      order: { fechaCreacion: 'DESC' },
    });
  }

  async findByLocation(latitud: number, longitud: number, radio: number = 10): Promise<Lugarturistico[]> {
    // Búsqueda básica por rango de coordenadas (implementación simple)
    const rangeLat = radio / 111; // Aproximación: 1 grado = 111 km
    const rangeLon = radio / (111 * Math.cos(latitud * Math.PI / 180));

    return await this.lugarturisticoRepository
      .createQueryBuilder('lugar')
      .where('lugar.latitud BETWEEN :minLat AND :maxLat', {
        minLat: latitud - rangeLat,
        maxLat: latitud + rangeLat,
      })
      .andWhere('lugar.longitud BETWEEN :minLon AND :maxLon', {
        minLon: longitud - rangeLon,
        maxLon: longitud + rangeLon,
      })
      .andWhere('lugar.activo = :activo', { activo: true })
      .leftJoinAndSelect('lugar.valoraciones', 'valoraciones')
      .getMany();
  }

  async update(id: number, updateLugarturisticoDto: UpdateLugarturisticoDto): Promise<Lugarturistico> {
    const lugarTuristico = await this.findOne(id);
    
    Object.assign(lugarTuristico, updateLugarturisticoDto);
    
    try {
      return await this.lugarturisticoRepository.save(lugarTuristico);
    } catch (error) {
      throw new BadRequestException('Error al actualizar el lugar turístico');
    }
  }

  async remove(id: number): Promise<void> {
    const lugarTuristico = await this.findOne(id);
    
    // Soft delete: marcamos como inactivo
    lugarTuristico.activo = false;
    await this.lugarturisticoRepository.save(lugarTuristico);
  }

  async getPromedioCalificacion(id: number): Promise<number> {
    const result = await this.lugarturisticoRepository
      .createQueryBuilder('lugar')
      .leftJoin('lugar.valoraciones', 'valoracion')
      .select('AVG(valoracion.calificacion)', 'promedio')
      .where('lugar.id = :id', { id })
      .andWhere('valoracion.activo = :activo', { activo: true })
      .getRawOne();

    return result.promedio ? parseFloat(result.promedio) : 0;
  }
}
