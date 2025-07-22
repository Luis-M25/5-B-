import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateValoracionDto } from './dto/create-valoracion.dto';
import { UpdateValoracionDto } from './dto/update-valoracion.dto';
import { Valoracion } from './entities/valoracion.entity';
import { Lugarturistico } from '../lugarturistico/entities/lugarturistico.entity';

@Injectable()
export class ValoracionService {
  constructor(
    @InjectRepository(Valoracion)
    private readonly valoracionRepository: Repository<Valoracion>,
    @InjectRepository(Lugarturistico)
    private readonly lugarturisticoRepository: Repository<Lugarturistico>,
  ) {}

  async create(createValoracionDto: CreateValoracionDto): Promise<Valoracion> {
    // Validar que la calificación esté entre 1 y 5
    if (createValoracionDto.calificacion < 1 || createValoracionDto.calificacion > 5) {
      throw new BadRequestException('La calificación debe estar entre 1 y 5');
    }

    // Verificar que el lugar turístico existe
    const lugarTuristico = await this.lugarturisticoRepository.findOne({
      where: { id: createValoracionDto.lugarTuristicoId, activo: true },
    });

    if (!lugarTuristico) {
      throw new NotFoundException('Lugar turístico no encontrado');
    }

    try {
      const valoracion = this.valoracionRepository.create({
        ...createValoracionDto,
        lugarTuristico,
        activo: createValoracionDto.activo ?? true,
      });
      return await this.valoracionRepository.save(valoracion);
    } catch (error) {
      throw new BadRequestException('Error al crear la valoración');
    }
  }

  async findAll(): Promise<Valoracion[]> {
    return await this.valoracionRepository.find({
      where: { activo: true },
      relations: ['lugarTuristico'],
      order: { fechaCreacion: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Valoracion> {
    const valoracion = await this.valoracionRepository.findOne({
      where: { id, activo: true },
      relations: ['lugarTuristico'],
    });

    if (!valoracion) {
      throw new NotFoundException(`Valoración con ID ${id} no encontrada`);
    }

    return valoracion;
  }

  async findByLugarTuristico(lugarTuristicoId: number): Promise<Valoracion[]> {
    return await this.valoracionRepository.find({
      where: { 
        lugarTuristico: { id: lugarTuristicoId },
        activo: true 
      },
      relations: ['lugarTuristico'],
      order: { fechaCreacion: 'DESC' },
    });
  }

  async findByCalificacion(calificacion: number): Promise<Valoracion[]> {
    return await this.valoracionRepository.find({
      where: { calificacion, activo: true },
      relations: ['lugarTuristico'],
      order: { fechaCreacion: 'DESC' },
    });
  }

  async findByUsuario(nombreUsuario: string): Promise<Valoracion[]> {
    return await this.valoracionRepository.find({
      where: { nombreUsuario, activo: true },
      relations: ['lugarTuristico'],
      order: { fechaCreacion: 'DESC' },
    });
  }

  async findRecientes(limit: number = 10): Promise<Valoracion[]> {
    return await this.valoracionRepository.find({
      where: { activo: true },
      relations: ['lugarTuristico'],
      order: { fechaCreacion: 'DESC' },
      take: limit,
    });
  }

  async update(id: number, updateValoracionDto: UpdateValoracionDto): Promise<Valoracion> {
    const valoracion = await this.findOne(id);

    // Validar calificación si se está actualizando
    if (updateValoracionDto.calificacion && 
        (updateValoracionDto.calificacion < 1 || updateValoracionDto.calificacion > 5)) {
      throw new BadRequestException('La calificación debe estar entre 1 y 5');
    }

    // Si se está cambiando el lugar turístico, verificar que existe
    if (updateValoracionDto.lugarTuristicoId) {
      const lugarTuristico = await this.lugarturisticoRepository.findOne({
        where: { id: updateValoracionDto.lugarTuristicoId, activo: true },
      });

      if (!lugarTuristico) {
        throw new NotFoundException('Lugar turístico no encontrado');
      }

      valoracion.lugarTuristico = lugarTuristico;
    }

    Object.assign(valoracion, updateValoracionDto);

    try {
      return await this.valoracionRepository.save(valoracion);
    } catch (error) {
      throw new BadRequestException('Error al actualizar la valoración');
    }
  }

  async remove(id: number): Promise<void> {
    const valoracion = await this.findOne(id);
    
    // Soft delete: marcamos como inactivo
    valoracion.activo = false;
    await this.valoracionRepository.save(valoracion);
  }

  async getEstadisticasLugar(lugarTuristicoId: number): Promise<any> {
    const estadisticas = await this.valoracionRepository
      .createQueryBuilder('valoracion')
      .select([
        'COUNT(valoracion.id) as totalValoraciones',
        'AVG(valoracion.calificacion) as promedioCalificacion',
        'MIN(valoracion.calificacion) as calificacionMinima',
        'MAX(valoracion.calificacion) as calificacionMaxima',
      ])
      .where('valoracion.lugarTuristico.id = :lugarTuristicoId', { lugarTuristicoId })
      .andWhere('valoracion.activo = :activo', { activo: true })
      .getRawOne();

    // Contar valoraciones por calificación
    const distribucion = await this.valoracionRepository
      .createQueryBuilder('valoracion')
      .select('valoracion.calificacion', 'calificacion')
      .addSelect('COUNT(valoracion.id)', 'cantidad')
      .where('valoracion.lugarTuristico.id = :lugarTuristicoId', { lugarTuristicoId })
      .andWhere('valoracion.activo = :activo', { activo: true })
      .groupBy('valoracion.calificacion')
      .orderBy('valoracion.calificacion', 'ASC')
      .getRawMany();

    return {
      totalValoraciones: parseInt(estadisticas.totalValoraciones) || 0,
      promedioCalificacion: parseFloat(estadisticas.promedioCalificacion) || 0,
      calificacionMinima: parseInt(estadisticas.calificacionMinima) || 0,
      calificacionMaxima: parseInt(estadisticas.calificacionMaxima) || 0,
      distribucionCalificaciones: distribucion.map(item => ({
        calificacion: parseInt(item.calificacion),
        cantidad: parseInt(item.cantidad),
      })),
    };
  }
}
