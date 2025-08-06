import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Temporada } from './temporada.entity';
import { CreateTemporadaInput } from './dto/create-temporada.input';
import { UpdateTemporadaInput } from './dto/update-temporada.input';

@Injectable()
export class TemporadaService {
  constructor(
    @InjectRepository(Temporada)
    private readonly temporadaRepository: Repository<Temporada>,
  ) {}

  async create(createTemporadaInput: CreateTemporadaInput): Promise<Temporada> {
    const temporada = this.temporadaRepository.create(createTemporadaInput);
    return this.temporadaRepository.save(temporada);
  }

  async findAll(): Promise<Temporada[]> {
    return this.temporadaRepository.find();
  }

  async findOne(id: number): Promise<Temporada | null> {
    return this.temporadaRepository.findOneBy({ id });
  }

  async update(id: number, updateTemporadaInput: UpdateTemporadaInput): Promise<Temporada | null> {
    await this.temporadaRepository.update(id, updateTemporadaInput);
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.temporadaRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
