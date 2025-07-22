import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriaDestino } from '../entidades/ICategoriadestino';

@Controller('categorias')
export class CategoriasController {
  constructor(
    @InjectRepository(CategoriaDestino)
    private categoriasRepository: Repository<CategoriaDestino>,
  ) {}

  @Get()
  findAll() {
    return this.categoriasRepository.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriasRepository.findOne({ 
      where: { id: parseInt(id) },
      relations: ['destinos'] 
    });
  }

  @Post()
  create(@Body() categoriaData: any) {
    const categoria = this.categoriasRepository.create(categoriaData);
    return this.categoriasRepository.save(categoria);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() categoriaData: any) {
    await this.categoriasRepository.update(id, categoriaData);
    return this.categoriasRepository.findOne({ where: { id: parseInt(id) } });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.categoriasRepository.delete(id);
    return { message: 'Categoría eliminada' };
  }
}