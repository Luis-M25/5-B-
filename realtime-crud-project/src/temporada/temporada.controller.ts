import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TemporadaService } from './temporada.service';
import { CreateTemporadaDto } from './dto/create-temporada.dto';
import { UpdateTemporadaDto } from './dto/update-temporada.dto';

@Controller('temporada')
export class TemporadaController {
  constructor(private readonly temporadaService: TemporadaService) {}

  @Post()
  create(@Body() createTemporadaDto: CreateTemporadaDto) {
    return this.temporadaService.create(createTemporadaDto);
  }

  @Get()
  findAll() {
    return this.temporadaService.findAll();
  }

  @Get('actual')
  findTemporadaActual() {
    return this.temporadaService.findTemporadaActual();
  }

  @Get('proximas')
  findTemporadasProximas(@Query('dias') dias?: number) {
    return this.temporadaService.findTemporadasProximas(dias || 30);
  }

  @Post('calcular-precio')
  calcularPrecioConTemporada(@Body() data: { precioBase: number; fecha: string }) {
    return this.temporadaService.calcularPrecioConTemporada(data.precioBase, new Date(data.fecha));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.temporadaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTemporadaDto: UpdateTemporadaDto) {
    return this.temporadaService.update(+id, updateTemporadaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.temporadaService.remove(+id);
  }
}
