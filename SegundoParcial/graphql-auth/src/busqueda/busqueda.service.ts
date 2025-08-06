import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Busqueda } from './busqueda.entity';
import { CreateBusquedaInput } from './dto/create-busqueda.input';
import { UpdateBusquedaInput } from './dto/update-busqueda.input';

@Injectable()
export class BusquedaService {
  constructor(
    @InjectRepository(Busqueda)
    private readonly busquedaRepository: Repository<Busqueda>,
  ) {}

  async create(createBusquedaInput: CreateBusquedaInput): Promise<Busqueda> {
    const busqueda = this.busquedaRepository.create(createBusquedaInput);
    return this.busquedaRepository.save(busqueda);
  }

  async findAll(): Promise<Busqueda[]> {
    return this.busquedaRepository.find();
  }

  async findOne(id: number): Promise<Busqueda | null> {
    return this.busquedaRepository.findOneBy({ id });
  }

  async update(id: number, updateBusquedaInput: UpdateBusquedaInput): Promise<Busqueda | null> {
    await this.busquedaRepository.update(id, updateBusquedaInput);
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.busquedaRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
