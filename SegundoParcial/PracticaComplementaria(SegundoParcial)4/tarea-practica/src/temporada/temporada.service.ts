import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTemporadaDto } from './dto/create-temporada.dto';
import { UpdateTemporadaDto } from './dto/update-temporada.dto';
import { Temporada } from './entities/temporada.entity';

@Injectable()
export class TemporadaService {
  constructor(
    @InjectRepository(Temporada)
    private readonly temporadaRepository: Repository<Temporada>,
  ) {}

  async create(createTemporadaDto: CreateTemporadaDto): Promise<Temporada> {
    // Validar que la fecha de inicio sea anterior a la fecha de fin
    const fechaInicio = new Date(createTemporadaDto.fechaInicio);
    const fechaFin = new Date(createTemporadaDto.fechaFin);
    
    if (fechaInicio >= fechaFin) {
      throw new BadRequestException('La fecha de inicio debe ser anterior a la fecha de fin');
    }

    // Verificar solapamiento con otras temporadas
    const temporadasSolapadas = await this.findOverlapping(fechaInicio, fechaFin);
    if (temporadasSolapadas.length > 0) {
      throw new BadRequestException('Las fechas se solapan con otra temporada existente');
    }

    const temporada = this.temporadaRepository.create(createTemporadaDto);
    return await this.temporadaRepository.save(temporada);
  }

  async findAll(): Promise<Temporada[]> {
    return await this.temporadaRepository.find({
      order: { fechaInicio: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Temporada> {
    const temporada = await this.temporadaRepository.findOne({
      where: { id },
    });

    if (!temporada) {
      throw new NotFoundException(`Temporada con ID ${id} no encontrada`);
    }

    return temporada;
  }

  async update(id: number, updateTemporadaDto: UpdateTemporadaDto): Promise<Temporada> {
    const temporada = await this.findOne(id);
    
    // Si se actualizan las fechas, validar
    if (updateTemporadaDto.fechaInicio || updateTemporadaDto.fechaFin) {
      const fechaInicio = new Date(updateTemporadaDto.fechaInicio ?? temporada.fechaInicio);
      const fechaFin = new Date(updateTemporadaDto.fechaFin ?? temporada.fechaFin);
      
      if (fechaInicio >= fechaFin) {
        throw new BadRequestException('La fecha de inicio debe ser anterior a la fecha de fin');
      }

      // Verificar solapamiento excluyendo la temporada actual
      const temporadasSolapadas = await this.findOverlapping(fechaInicio, fechaFin, id);
      if (temporadasSolapadas.length > 0) {
        throw new BadRequestException('Las fechas se solapan con otra temporada existente');
      }
    }
    
    Object.assign(temporada, updateTemporadaDto);
    
    return await this.temporadaRepository.save(temporada);
  }

  async remove(id: number): Promise<void> {
    const temporada = await this.findOne(id);
    await this.temporadaRepository.remove(temporada);
  }

  // Métodos adicionales específicos para temporadas
  async findByTipo(tipo: string): Promise<Temporada[]> {
    return await this.temporadaRepository.find({
      where: { tipo },
      order: { fechaInicio: 'ASC' },
    });
  }

  async findActivas(): Promise<Temporada[]> {
    return await this.temporadaRepository.find({
      where: { estado: 'activa' },
      order: { fechaInicio: 'ASC' },
    });
  }

  async findCurrentSeason(): Promise<Temporada | null> {
    const hoy = new Date();
    return await this.temporadaRepository
      .createQueryBuilder('temporada')
      .where('temporada.fechaInicio <= :hoy', { hoy })
      .andWhere('temporada.fechaFin >= :hoy', { hoy })
      .andWhere('temporada.estado = :estado', { estado: 'activa' })
      .getOne();
  }

  async findUpcoming(): Promise<Temporada[]> {
    const hoy = new Date();
    return await this.temporadaRepository
      .createQueryBuilder('temporada')
      .where('temporada.fechaInicio > :hoy', { hoy })
      .andWhere('temporada.estado IN (:...estados)', { estados: ['activa', 'programada'] })
      .orderBy('temporada.fechaInicio', 'ASC')
      .getMany();
  }

  private async findOverlapping(fechaInicio: Date, fechaFin: Date, excludeId?: number): Promise<Temporada[]> {
    const query = this.temporadaRepository
      .createQueryBuilder('temporada')
      .where('temporada.fechaInicio < :fechaFin', { fechaFin })
      .andWhere('temporada.fechaFin > :fechaInicio', { fechaInicio });

    if (excludeId) {
      query.andWhere('temporada.id != :excludeId', { excludeId });
    }

    return await query.getMany();
  }
}
