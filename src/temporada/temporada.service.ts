import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
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
    // Validar que fechaInicio sea anterior a fechaFin
    if (new Date(createTemporadaDto.fechaInicio) >= new Date(createTemporadaDto.fechaFin)) {
      throw new BadRequestException('La fecha de inicio debe ser anterior a la fecha de fin');
    }

    // Validar que no haya solapamiento con otras temporadas
    const existeConflicto = await this.verificarConflictoFechas(
      createTemporadaDto.fechaInicio,
      createTemporadaDto.fechaFin,
    );

    if (existeConflicto) {
      throw new BadRequestException('Ya existe una temporada en ese período de fechas');
    }

    try {
      const temporada = this.temporadaRepository.create({
        ...createTemporadaDto,
        activo: createTemporadaDto.activo ?? true,
      });
      return await this.temporadaRepository.save(temporada);
    } catch (error) {
      throw new BadRequestException('Error al crear la temporada');
    }
  }

  async findAll(): Promise<Temporada[]> {
    return await this.temporadaRepository.find({
      where: { activo: true },
      order: { fechaInicio: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Temporada> {
    const temporada = await this.temporadaRepository.findOne({
      where: { id, activo: true },
    });

    if (!temporada) {
      throw new NotFoundException(`Temporada con ID ${id} no encontrada`);
    }

    return temporada;
  }

  async findByDate(fecha: Date): Promise<Temporada | null> {
    return await this.temporadaRepository.findOne({
      where: {
        fechaInicio: Between(new Date(fecha.getFullYear(), 0, 1), fecha),
        fechaFin: Between(fecha, new Date(fecha.getFullYear(), 11, 31)),
        activo: true,
      },
    });
  }

  async findTemporadaActual(): Promise<Temporada | null> {
    const hoy = new Date();
    return await this.temporadaRepository
      .createQueryBuilder('temporada')
      .where('temporada.fechaInicio <= :hoy', { hoy })
      .andWhere('temporada.fechaFin >= :hoy', { hoy })
      .andWhere('temporada.activo = :activo', { activo: true })
      .getOne();
  }

  async findTemporadasProximas(dias: number = 30): Promise<Temporada[]> {
    const hoy = new Date();
    const fechaLimite = new Date(hoy.getTime() + (dias * 24 * 60 * 60 * 1000));

    return await this.temporadaRepository
      .createQueryBuilder('temporada')
      .where('temporada.fechaInicio BETWEEN :hoy AND :fechaLimite', { hoy, fechaLimite })
      .andWhere('temporada.activo = :activo', { activo: true })
      .orderBy('temporada.fechaInicio', 'ASC')
      .getMany();
  }

  async update(id: number, updateTemporadaDto: UpdateTemporadaDto): Promise<Temporada> {
    const temporada = await this.findOne(id);

    // Validar fechas si se están actualizando
    if (updateTemporadaDto.fechaInicio && updateTemporadaDto.fechaFin) {
      if (new Date(updateTemporadaDto.fechaInicio) >= new Date(updateTemporadaDto.fechaFin)) {
        throw new BadRequestException('La fecha de inicio debe ser anterior a la fecha de fin');
      }
    }

    Object.assign(temporada, updateTemporadaDto);

    try {
      return await this.temporadaRepository.save(temporada);
    } catch (error) {
      throw new BadRequestException('Error al actualizar la temporada');
    }
  }

  async remove(id: number): Promise<void> {
    const temporada = await this.findOne(id);
    
    // Soft delete: marcamos como inactivo
    temporada.activo = false;
    await this.temporadaRepository.save(temporada);
  }

  async calcularPrecioConTemporada(precioBase: number, fecha: Date): Promise<number> {
    const temporada = await this.findByDate(fecha);
    
    if (!temporada) {
      return precioBase;
    }

    return precioBase * temporada.multiplicadorPrecio;
  }

  private async verificarConflictoFechas(fechaInicio: Date, fechaFin: Date, excludeId?: number): Promise<boolean> {
    const query = this.temporadaRepository
      .createQueryBuilder('temporada')
      .where('temporada.activo = :activo', { activo: true })
      .andWhere(
        '(temporada.fechaInicio <= :fechaFin AND temporada.fechaFin >= :fechaInicio)',
        { fechaInicio, fechaFin }
      );

    if (excludeId) {
      query.andWhere('temporada.id != :excludeId', { excludeId });
    }

    const conflicto = await query.getOne();
    return !!conflicto;
  }
}
