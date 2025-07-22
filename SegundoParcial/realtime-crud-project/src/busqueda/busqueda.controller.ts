import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BusquedaService } from './busqueda.service';
import { CreateBusquedaDto } from './dto/create-busqueda.dto';
import { UpdateBusquedaDto } from './dto/update-busqueda.dto';

@Controller('busqueda')
export class BusquedaController {
  constructor(private readonly busquedaService: BusquedaService) {}

  @Post()
  create(@Body() createBusquedaDto: CreateBusquedaDto) {
    return this.busquedaService.create(createBusquedaDto);
  }

  @Post('buscar')
  buscarLugaresTuristicos(@Body() data: {
    termino: string;
    categoria?: string;
    latitud?: number;
    longitud?: number;
    radio?: number;
  }) {
    return this.busquedaService.buscarLugaresTuristicos(
      data.termino,
      data.categoria,
      data.latitud,
      data.longitud,
      data.radio
    );
  }

  @Get()
  findAll() {
    return this.busquedaService.findAll();
  }

  @Get('termino/:termino')
  findByTermino(@Param('termino') termino: string) {
    return this.busquedaService.findByTermino(termino);
  }

  @Get('categoria/:categoria')
  findByCategoria(@Param('categoria') categoria: string) {
    return this.busquedaService.findByCategoria(categoria);
  }

  @Get('recientes')
  findRecientes(@Query('limit') limit?: number) {
    return this.busquedaService.findRecientes(limit || 20);
  }

  @Get('terminos-populares')
  getTerminosMasPopulares(@Query('limit') limit?: number) {
    return this.busquedaService.getTerminosMasPopulares(limit || 10);
  }

  @Get('categorias-populares')
  getCategoriasMasPopulares(@Query('limit') limit?: number) {
    return this.busquedaService.getCategoriasMasPopulares(limit || 10);
  }

  @Get('estadisticas')
  getEstadisticasBusqueda() {
    return this.busquedaService.getEstadisticasBusqueda();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.busquedaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusquedaDto: UpdateBusquedaDto) {
    return this.busquedaService.update(+id, updateBusquedaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.busquedaService.remove(+id);
  }
}
