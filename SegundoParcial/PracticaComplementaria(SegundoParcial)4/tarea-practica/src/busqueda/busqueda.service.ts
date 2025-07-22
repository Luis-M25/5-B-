import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBusquedaDto } from './dto/create-busqueda.dto';
import { UpdateBusquedaDto } from './dto/update-busqueda.dto';
import { Busqueda } from './entities/busqueda.entity';

@Injectable()
export class BusquedaService {
  constructor(
    @InjectRepository(Busqueda)
    private readonly busquedaRepository: Repository<Busqueda>,
  ) {}

  async create(createBusquedaDto: CreateBusquedaDto): Promise<Busqueda> {
    const busqueda = this.busquedaRepository.create(createBusquedaDto);
    return await this.busquedaRepository.save(busqueda);
  }

  async findAll(): Promise<Busqueda[]> {
    return await this.busquedaRepository.find({
      order: { fechaCreacion: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Busqueda> {
    const busqueda = await this.busquedaRepository.findOne({
      where: { id },
    });

    if (!busqueda) {
      throw new NotFoundException(`Búsqueda con ID ${id} no encontrada`);
    }

    return busqueda;
  }

  async update(id: number, updateBusquedaDto: UpdateBusquedaDto): Promise<Busqueda> {
    const busqueda = await this.findOne(id);
    
    Object.assign(busqueda, updateBusquedaDto);
    
    return await this.busquedaRepository.save(busqueda);
  }

  async remove(id: number): Promise<void> {
    const busqueda = await this.findOne(id);
    await this.busquedaRepository.remove(busqueda);
  }
}
