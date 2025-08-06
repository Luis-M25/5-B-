import { Controller, Get, Param, Query } from '@nestjs/common';
import { OperadoresService } from './operadores.service';
import { GetOperadoresDto, OperadorResponseDto, OperadorDetalleDto } from './dto/operador.dto';
import { ApiResponse } from '../../../../shared/interfaces';

@Controller('operadores')
export class OperadoresController {
  constructor(private readonly operadoresService: OperadoresService) {}

  @Get()
  async obtenerOperadores(
    @Query() filtros: GetOperadoresDto
  ): Promise<ApiResponse<OperadorResponseDto[]>> {
    return await this.operadoresService.obtenerOperadores(filtros);
  }

  @Get('disponibles')
  async obtenerOperadoresDisponibles(): Promise<ApiResponse<OperadorResponseDto[]>> {
    return await this.operadoresService.obtenerOperadoresDisponibles();
  }

  @Get(':id')
  async obtenerOperadorPorId(
    @Param('id') id: string
  ): Promise<ApiResponse<OperadorDetalleDto>> {
    return await this.operadoresService.obtenerOperadorPorId(id);
  }
}
