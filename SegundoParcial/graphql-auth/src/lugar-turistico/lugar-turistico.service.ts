import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LugarTuristico } from './lugar-turistico.entity';
import { CreateLugarTuristicoInput } from './dto/create-lugar-turistico.input';
import { UpdateLugarTuristicoInput } from './dto/update-lugar-turistico.input';

@Injectable()
export class LugarTuristicoService {
  constructor(
    @InjectRepository(LugarTuristico)
    private readonly lugarTuristicoRepository: Repository<LugarTuristico>,
  ) {}

  async create(createLugarTuristicoInput: CreateLugarTuristicoInput): Promise<LugarTuristico> {
    const lugar = this.lugarTuristicoRepository.create(createLugarTuristicoInput);
    return this.lugarTuristicoRepository.save(lugar);
  }

  async findAll(): Promise<LugarTuristico[]> {
    return this.lugarTuristicoRepository.find();
  }

  async findOne(id: number): Promise<LugarTuristico | null> {
    return this.lugarTuristicoRepository.findOneBy({ id });
  }

  async update(id: number, updateLugarTuristicoInput: UpdateLugarTuristicoInput): Promise<LugarTuristico | null> {
    await this.lugarTuristicoRepository.update(id, updateLugarTuristicoInput);
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.lugarTuristicoRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
