import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateBusquedaDto } from './dto/create-busqueda.dto';
import { UpdateBusquedaDto } from './dto/update-busqueda.dto';
import { Busqueda } from './entities/busqueda.entity';
import { Lugarturistico } from '../lugarturistico/entities/lugarturistico.entity';

@Injectable()
export class BusquedaService {
  constructor(
    @InjectRepository(Busqueda)
    private readonly busquedaRepository: Repository<Busqueda>,
    @InjectRepository(Lugarturistico)
    private readonly lugarturisticoRepository: Repository<Lugarturistico>,
  ) {}

  async create(createBusquedaDto: CreateBusquedaDto): Promise<Busqueda> {
    let lugarTuristico: Lugarturistico | undefined = undefined;

    if (createBusquedaDto.lugarTuristicoId) {
      const lugar = await this.lugarturisticoRepository.findOne({
        where: { id: createBusquedaDto.lugarTuristicoId, activo: true },
      });
      if (lugar) {
        lugarTuristico = lugar;
      }
    }

    try {
      const busqueda = this.busquedaRepository.create({
        terminoBusqueda: createBusquedaDto.terminoBusqueda,
        categoria: createBusquedaDto.categoria,
        latitudBusqueda: createBusquedaDto.latitudBusqueda,
        longitudBusqueda: createBusquedaDto.longitudBusqueda,
        radioKm: createBusquedaDto.radioKm,
        usuarioIp: createBusquedaDto.usuarioIp,
        cantidadResultados: createBusquedaDto.cantidadResultados || 0,
        lugarTuristico,
      });
      return await this.busquedaRepository.save(busqueda);
    } catch (error) {
      throw new BadRequestException('Error al registrar la búsqueda');
    }
  }

  async findAll(): Promise<Busqueda[]> {
    return await this.busquedaRepository.find({
      relations: ['lugarTuristico'],
      order: { fechaBusqueda: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Busqueda> {
    const busqueda = await this.busquedaRepository.findOne({
      where: { id },
      relations: ['lugarTuristico'],
    });

    if (!busqueda) {
      throw new NotFoundException(`Búsqueda con ID ${id} no encontrada`);
    }

    return busqueda;
  }

  async findByTermino(termino: string): Promise<Busqueda[]> {
    return await this.busquedaRepository.find({
      where: { terminoBusqueda: Like(`%${termino}%`) },
      relations: ['lugarTuristico'],
      order: { fechaBusqueda: 'DESC' },
    });
  }

  async findByCategoria(categoria: string): Promise<Busqueda[]> {
    return await this.busquedaRepository.find({
      where: { categoria },
      relations: ['lugarTuristico'],
      order: { fechaBusqueda: 'DESC' },
    });
  }

  async findByUsuario(usuarioIp: string): Promise<Busqueda[]> {
    return await this.busquedaRepository.find({
      where: { usuarioIp },
      relations: ['lugarTuristico'],
      order: { fechaBusqueda: 'DESC' },
    });
  }

  async findRecientes(limit: number = 20): Promise<Busqueda[]> {
    return await this.busquedaRepository.find({
      relations: ['lugarTuristico'],
      order: { fechaBusqueda: 'DESC' },
      take: limit,
    });
  }

  async findByFechaRango(fechaInicio: Date, fechaFin: Date): Promise<Busqueda[]> {
    return await this.busquedaRepository
      .createQueryBuilder('busqueda')
      .where('busqueda.fechaBusqueda BETWEEN :fechaInicio AND :fechaFin', {
        fechaInicio,
        fechaFin,
      })
      .leftJoinAndSelect('busqueda.lugarTuristico', 'lugarTuristico')
      .orderBy('busqueda.fechaBusqueda', 'DESC')
      .getMany();
  }

  async update(id: number, updateBusquedaDto: UpdateBusquedaDto): Promise<Busqueda> {
    const busqueda = await this.findOne(id);

    // Si se está cambiando el lugar turístico, verificar que existe
    if (updateBusquedaDto.lugarTuristicoId) {
      const lugarTuristico = await this.lugarturisticoRepository.findOne({
        where: { id: updateBusquedaDto.lugarTuristicoId, activo: true },
      });

      if (!lugarTuristico) {
        throw new NotFoundException('Lugar turístico no encontrado');
      }

      busqueda.lugarTuristico = lugarTuristico;
    }

    Object.assign(busqueda, updateBusquedaDto);

    try {
      return await this.busquedaRepository.save(busqueda);
    } catch (error) {
      throw new BadRequestException('Error al actualizar la búsqueda');
    }
  }

  async remove(id: number): Promise<void> {
    const busqueda = await this.findOne(id);
    await this.busquedaRepository.remove(busqueda);
  }

  async getTerminosMasPopulares(limit: number = 10): Promise<any[]> {
    return await this.busquedaRepository
      .createQueryBuilder('busqueda')
      .select('busqueda.terminoBusqueda', 'termino')
      .addSelect('COUNT(busqueda.id)', 'cantidad')
      .groupBy('busqueda.terminoBusqueda')
      .orderBy('cantidad', 'DESC')
      .limit(limit)
      .getRawMany();
  }

  async getCategoriasMasPopulares(limit: number = 10): Promise<any[]> {
    return await this.busquedaRepository
      .createQueryBuilder('busqueda')
      .select('busqueda.categoria', 'categoria')
      .addSelect('COUNT(busqueda.id)', 'cantidad')
      .where('busqueda.categoria IS NOT NULL')
      .groupBy('busqueda.categoria')
      .orderBy('cantidad', 'DESC')
      .limit(limit)
      .getRawMany();
  }

  async getEstadisticasBusqueda(): Promise<any> {
    const totalBusquedas = await this.busquedaRepository.count();
    
    const busquedasHoy = await this.busquedaRepository
      .createQueryBuilder('busqueda')
      .where('DATE(busqueda.fechaBusqueda) = DATE(:hoy)', { hoy: new Date() })
      .getCount();

    const busquedasEstaSemana = await this.busquedaRepository
      .createQueryBuilder('busqueda')
      .where('busqueda.fechaBusqueda >= :inicioSemana', { 
        inicioSemana: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) 
      })
      .getCount();

    const promedioResultados = await this.busquedaRepository
      .createQueryBuilder('busqueda')
      .select('AVG(busqueda.cantidadResultados)', 'promedio')
      .getRawOne();

    return {
      totalBusquedas,
      busquedasHoy,
      busquedasEstaSemana,
      promedioResultados: parseFloat(promedioResultados.promedio) || 0,
    };
  }

  async buscarLugaresTuristicos(
    termino: string,
    categoria?: string,
    latitud?: number,
    longitud?: number,
    radio?: number,
  ): Promise<Lugarturistico[]> {
    let query = this.lugarturisticoRepository
      .createQueryBuilder('lugar')
      .where('lugar.activo = :activo', { activo: true });

    // Búsqueda por término
    if (termino) {
      query = query.andWhere(
        '(lugar.nombre LIKE :termino OR lugar.descripcion LIKE :termino OR lugar.ubicacion LIKE :termino)',
        { termino: `%${termino}%` }
      );
    }

    // Filtrar por categoría
    if (categoria) {
      query = query.andWhere('lugar.categoria = :categoria', { categoria });
    }

    // Búsqueda por ubicación
    if (latitud && longitud && radio) {
      const rangeLat = radio / 111;
      const rangeLon = radio / (111 * Math.cos(latitud * Math.PI / 180));

      query = query.andWhere('lugar.latitud BETWEEN :minLat AND :maxLat', {
        minLat: latitud - rangeLat,
        maxLat: latitud + rangeLat,
      })
      .andWhere('lugar.longitud BETWEEN :minLon AND :maxLon', {
        minLon: longitud - rangeLon,
        maxLon: longitud + rangeLon,
      });
    }

    const resultados = await query
      .leftJoinAndSelect('lugar.valoraciones', 'valoraciones')
      .orderBy('lugar.fechaCreacion', 'DESC')
      .getMany();

    // Registrar la búsqueda
    await this.create({
      terminoBusqueda: termino,
      categoria,
      latitudBusqueda: latitud,
      longitudBusqueda: longitud,
      radioKm: radio,
      cantidadResultados: resultados.length,
    });

    return resultados;
  }
}
