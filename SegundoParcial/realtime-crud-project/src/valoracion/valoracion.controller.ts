import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ValoracionService } from './valoracion.service';
import { CreateValoracionDto } from './dto/create-valoracion.dto';
import { UpdateValoracionDto } from './dto/update-valoracion.dto';

@Controller('valoracion')
export class ValoracionController {
  constructor(private readonly valoracionService: ValoracionService) {}

  @Post()
  create(@Body() createValoracionDto: CreateValoracionDto) {
    return this.valoracionService.create(createValoracionDto);
  }

  @Get()
  findAll() {
    return this.valoracionService.findAll();
  }

  @Get('lugar/:lugarId')
  findByLugarTuristico(@Param('lugarId') lugarId: string) {
    return this.valoracionService.findByLugarTuristico(+lugarId);
  }

  @Get('calificacion/:calificacion')
  findByCalificacion(@Param('calificacion') calificacion: string) {
    return this.valoracionService.findByCalificacion(+calificacion);
  }

  @Get('usuario/:nombreUsuario')
  findByUsuario(@Param('nombreUsuario') nombreUsuario: string) {
    return this.valoracionService.findByUsuario(nombreUsuario);
  }

  @Get('recientes')
  findRecientes(@Query('limit') limit?: number) {
    return this.valoracionService.findRecientes(limit || 10);
  }

  @Get('estadisticas/:lugarId')
  getEstadisticasLugar(@Param('lugarId') lugarId: string) {
    return this.valoracionService.getEstadisticasLugar(+lugarId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.valoracionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateValoracionDto: UpdateValoracionDto) {
    return this.valoracionService.update(+id, updateValoracionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.valoracionService.remove(+id);
  }
}
