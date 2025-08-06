import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PreferenciaTuristica } from '../entidades/IPreferenciaturistica';

@Controller('preferencias')
export class PreferenciasController {
  constructor(
    @InjectRepository(PreferenciaTuristica)
    private preferenciasRepository: Repository<PreferenciaTuristica>,
  ) {}

  @Get()
  findAll() {
    return this.preferenciasRepository.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preferenciasRepository.findOne({ 
      where: { id: parseInt(id) },
      relations: ['recomendaciones'] 
    });
  }

  @Post()
  create(@Body() preferenciaData: any) {
    const preferencia = this.preferenciasRepository.create(preferenciaData);
    return this.preferenciasRepository.save(preferencia);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() preferenciaData: any) {
    await this.preferenciasRepository.update(id, preferenciaData);
    return this.preferenciasRepository.findOne({ where: { id: parseInt(id) } });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.preferenciasRepository.delete(id);
    return { message: 'Preferencia eliminada' };
  }
}