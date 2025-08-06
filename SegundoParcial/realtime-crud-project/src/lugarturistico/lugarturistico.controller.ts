import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LugarturisticoService } from './lugarturistico.service';
import { CreateLugarturisticoDto } from './dto/create-lugarturistico.dto';
import { UpdateLugarturisticoDto } from './dto/update-lugarturistico.dto';

@Controller('lugarturistico')
export class LugarturisticoController {
  constructor(private readonly lugarturisticoService: LugarturisticoService) {}

  @Post()
  create(@Body() createLugarturisticoDto: CreateLugarturisticoDto) {
    return this.lugarturisticoService.create(createLugarturisticoDto);
  }

  @Get()
  findAll() {
    return this.lugarturisticoService.findAll();
  }

  @Get('categoria/:categoria')
  findByCategory(@Param('categoria') categoria: string) {
    return this.lugarturisticoService.findByCategory(categoria);
  }

  @Get('ubicacion')
  findByLocation(
    @Query('latitud') latitud: number,
    @Query('longitud') longitud: number,
    @Query('radio') radio?: number
  ) {
    return this.lugarturisticoService.findByLocation(latitud, longitud, radio);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lugarturisticoService.findOne(+id);
  }

  @Get(':id/promedio-calificacion')
  getPromedioCalificacion(@Param('id') id: string) {
    return this.lugarturisticoService.getPromedioCalificacion(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLugarturisticoDto: UpdateLugarturisticoDto) {
    return this.lugarturisticoService.update(+id, updateLugarturisticoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lugarturisticoService.remove(+id);
  }
}
