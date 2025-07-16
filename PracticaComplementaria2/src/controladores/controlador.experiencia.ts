import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experiencia } from '../entidades/IExperiencia';
import { Destino } from '../entidades/IDestino';

@Controller('experiencias')
export class ExperienciasController {
  constructor(
    @InjectRepository(Experiencia)
    private experienciasRepository: Repository<Experiencia>,
    @InjectRepository(Destino)
    private destinosRepository: Repository<Destino>,
  ) {}

  @Get()
  findAll() {
    return this.experienciasRepository.find({ 
      relations: ['destino'] 
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.experienciasRepository.findOne({ 
      where: { id: parseInt(id) },
      relations: ['destino'] 
    });
  }

  @Post()
  async create(@Body() experienciaData: any) {
    const { destinoId, ...resto } = experienciaData;
    const experiencia = this.experienciasRepository.create(resto);

    if (destinoId) {
      const destino = await this.destinosRepository.findOne({ 
        where: { id: destinoId } 
      });
      if (destino) {
        (experiencia as any).destino = destino;
      }
    }

    return this.experienciasRepository.save(experiencia);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() experienciaData: any) {
    const { destinoId, ...resto } = experienciaData;
    
    const experiencia = await this.experienciasRepository.findOne({ 
      where: { id: parseInt(id) }
    });
    
    if (!experiencia) {
      return { message: 'Experiencia no encontrada' };
    }
    
    Object.assign(experiencia, resto);
    
    if (destinoId) {
      const destino = await this.destinosRepository.findOne({ 
        where: { id: destinoId } 
      });
      if (destino) {
        experiencia.destino = destino;
      }
    }
    
    return this.experienciasRepository.save(experiencia);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.experienciasRepository.delete(id);
    return { message: 'Experiencia eliminada' };
  }
}