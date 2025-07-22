import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recomendacion } from '../entidades/IRecomendaciones';
import { Destino } from '../entidades/IDestino';
import { PreferenciaTuristica } from '../entidades/IPreferenciaturistica';

@Controller('recomendaciones')
export class RecomendacionesController {
  constructor(
    @InjectRepository(Recomendacion)
    private recomendacionesRepository: Repository<Recomendacion>,
    @InjectRepository(Destino)
    private destinosRepository: Repository<Destino>,
    @InjectRepository(PreferenciaTuristica)
    private preferenciasRepository: Repository<PreferenciaTuristica>,
  ) {}

  @Get()
  findAll() {
    return this.recomendacionesRepository.find({ 
      relations: ['destino', 'preferenciaTuristica'] 
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recomendacionesRepository.findOne({ 
      where: { id: parseInt(id) },
      relations: ['destino', 'preferenciaTuristica'] 
    });
  }

  @Post()
  async create(@Body() recomendacionData: any) {
    const { destinoId, preferenciaTuristicaId, ...resto } = recomendacionData;
    const recomendacion = this.recomendacionesRepository.create(resto);

    if (destinoId) {
      const destino = await this.destinosRepository.findOne({ 
        where: { id: destinoId } 
      });
      if (destino) {
        (recomendacion as any).destino = destino;
      }
    }

    if (preferenciaTuristicaId) {
      const preferencia = await this.preferenciasRepository.findOne({ 
        where: { id: preferenciaTuristicaId } 
      });
      if (preferencia) {
        (recomendacion as any).preferenciaTuristica = preferencia;
      }
    }

    return this.recomendacionesRepository.save(recomendacion);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() recomendacionData: any) {
    const { destinoId, preferenciaTuristicaId, ...resto } = recomendacionData;
    
    const recomendacion = await this.recomendacionesRepository.findOne({ 
      where: { id: parseInt(id) }
    });
    
    if (!recomendacion) {
      return { message: 'Recomendación no encontrada' };
    }
    
    Object.assign(recomendacion, resto);
    
    if (destinoId) {
      const destino = await this.destinosRepository.findOne({ 
        where: { id: destinoId } 
      });
      if (destino) {
        recomendacion.destino = destino;
      }
    }
    
    if (preferenciaTuristicaId) {
      const preferencia = await this.preferenciasRepository.findOne({ 
        where: { id: preferenciaTuristicaId } 
      });
      if (preferencia) {
        recomendacion.preferenciaTuristica = preferencia;
      }
    }
    
    return this.recomendacionesRepository.save(recomendacion);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.recomendacionesRepository.delete(id);
    return { message: 'Recomendación eliminada' };
  }
}