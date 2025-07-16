import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Destino } from '../entidades/IDestino';
import { CategoriaDestino } from '../entidades/ICategoriadestino';

@Controller('destinos')
export class DestinosController {
  constructor(
    @InjectRepository(Destino)
    private destinosRepository: Repository<Destino>,
    @InjectRepository(CategoriaDestino)
    private categoriasRepository: Repository<CategoriaDestino>,
  ) {}

  @Get()
  findAll() {
    return this.destinosRepository.find({ 
      relations: ['categorias'] 
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.destinosRepository.findOne({ 
      where: { id: parseInt(id) },
      relations: ['categorias', 'experiencias', 'recomendaciones'] 
    });
  }

  @Post()
  async create(@Body() destinoData: any) {
  const { categoriasIds, ...resto } = destinoData;
  const destino = this.destinosRepository.create(resto) as unknown as Destino;
  
  if (categoriasIds && categoriasIds.length) {
    destino.categorias = await this.categoriasRepository.findByIds(categoriasIds);
  }
  
  return this.destinosRepository.save(destino);
}

  @Put(':id')
  async update(@Param('id') id: string, @Body() destinoData: any) {
    const { categoriasIds, ...resto } = destinoData;
    
    const destino = await this.destinosRepository.findOne({ 
      where: { id: parseInt(id) },
      relations: ['categorias'] 
    });
    
    if (!destino) {
      return { message: 'Destino no encontrado' };
    }
    
    Object.assign(destino, resto);
    
    if (categoriasIds && categoriasIds.length) {
      destino.categorias = await this.categoriasRepository.findByIds(categoriasIds);
    }
    
    return this.destinosRepository.save(destino);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.destinosRepository.delete(id);
    return { message: 'Destino eliminado' };
  }
}
