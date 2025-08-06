import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { SurtidoresService } from './surtidores.service';
import { GetSurtidoresDto, SurtidorResponseDto, SurtidorDetalleDto, AsignarSurtidorDto, LiberarSurtidorDto } from './dto/surtidor.dto';
import { ApiResponse } from '../../../../shared/interfaces';

@Controller('surtidores')
export class SurtidoresController {
  constructor(private readonly surtidoresService: SurtidoresService) {}

  @Get()
  async obtenerSurtidores(
    @Query() filtros: GetSurtidoresDto
  ): Promise<ApiResponse<SurtidorResponseDto[]>> {
    return await this.surtidoresService.obtenerSurtidores(filtros);
  }

  @Get('disponibles')
  async obtenerSurtidoresDisponibles(): Promise<ApiResponse<SurtidorResponseDto[]>> {
    return await this.surtidoresService.obtenerSurtidoresDisponibles();
  }

  @Get(':id')
  async obtenerSurtidorPorId(
    @Param('id') id: string
  ): Promise<ApiResponse<SurtidorDetalleDto>> {
    return await this.surtidoresService.obtenerSurtidorPorId(id);
  }

  @Post('asignar')
  async asignarSurtidor(
    @Body() datos: AsignarSurtidorDto
  ): Promise<ApiResponse<SurtidorResponseDto>> {
    return await this.surtidoresService.asignarSurtidor(datos);
  }

  @Post('liberar')
  async liberarSurtidor(
    @Body() datos: LiberarSurtidorDto
  ): Promise<ApiResponse<SurtidorResponseDto>> {
    return await this.surtidoresService.liberarSurtidor(datos);
  }
}
