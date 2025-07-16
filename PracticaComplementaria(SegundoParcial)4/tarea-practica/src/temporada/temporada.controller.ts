import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus} from '@nestjs/common';
import { TemporadaService } from './temporada.service';
import { CreateTemporadaDto } from './dto/create-temporada.dto';
import { UpdateTemporadaDto } from './dto/update-temporada.dto';
import { Temporada } from './entities/temporada.entity';

@Controller('temporada')
export class TemporadaController {
  constructor(private readonly temporadaService: TemporadaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTemporadaDto: CreateTemporadaDto): Promise<Temporada> {
    console.log('📥 [TEMPORADA] Datos recibidos:', JSON.stringify(createTemporadaDto, null, 2));
    console.log('📥 [TEMPORADA] Tipo de nombre:', typeof createTemporadaDto.nombre);
    console.log('📥 [TEMPORADA] Valor de nombre:', createTemporadaDto.nombre);
    console.log('📥 [TEMPORADA] Tipo de fechaInicio:', typeof createTemporadaDto.fechaInicio);
    console.log('📥 [TEMPORADA] Valor de fechaInicio:', createTemporadaDto.fechaInicio);
    return await this.temporadaService.create(createTemporadaDto);
  }

  @Get()
  async findAll(): Promise<Temporada[]> {
    return await this.temporadaService.findAll();
  }

  @Get('tipo/:tipo')
  async findByTipo(@Param('tipo') tipo: string): Promise<Temporada[]> {
    return await this.temporadaService.findByTipo(tipo);
  }

  @Get('activas')
  async findActivas(): Promise<Temporada[]> {
    return await this.temporadaService.findActivas();
  }

  @Get('actual')
  async findCurrentSeason(): Promise<Temporada | null> {
    return await this.temporadaService.findCurrentSeason();
  }

  @Get('proximas')
  async findUpcoming(): Promise<Temporada[]> {
    return await this.temporadaService.findUpcoming();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Temporada> {
    return await this.temporadaService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateTemporadaDto: UpdateTemporadaDto
  ): Promise<Temporada> {
    return await this.temporadaService.update(id, updateTemporadaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.temporadaService.remove(id);
  }
}
