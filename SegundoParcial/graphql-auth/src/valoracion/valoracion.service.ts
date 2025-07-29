import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Valoracion } from './valoracion.entity';
import { CreateValoracionInput } from './dto/create-valoracion.input';
import { UpdateValoracionInput } from './dto/update-valoracion.input';

@Injectable()
export class ValoracionService {
  constructor(
    @InjectRepository(Valoracion)
    private readonly valoracionRepository: Repository<Valoracion>,
  ) {}

  async create(createValoracionInput: CreateValoracionInput): Promise<Valoracion> {
    const valoracion = this.valoracionRepository.create(createValoracionInput);
    return this.valoracionRepository.save(valoracion);
  }

  async findAll(): Promise<Valoracion[]> {
    return this.valoracionRepository.find();
  }

  async findOne(id: number): Promise<Valoracion | null> {
    return this.valoracionRepository.findOneBy({ id });
  }

  async update(id: number, updateValoracionInput: UpdateValoracionInput): Promise<Valoracion | null> {
    await this.valoracionRepository.update(id, updateValoracionInput);
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.valoracionRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
