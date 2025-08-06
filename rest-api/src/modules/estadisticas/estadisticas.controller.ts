import { Controller, Get, HttpStatus, HttpException } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import { ApiResponse } from '../../../../shared/interfaces';

@Controller('estadisticas')
export class EstadisticasController {
  constructor(private readonly estadisticasService: EstadisticasService) {}

  @Get()
  async getEstadisticas() {
    try {
      const estadisticas = await this.estadisticasService.getEstadisticas();
      const response: ApiResponse<any> = {
        success: true,
        data: estadisticas,
        message: 'Estadísticas obtenidas exitosamente',
        timestamp: new Date()
      };
      return response;
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          error: error.message,
          timestamp: new Date()
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('dashboard')
  async getDashboard() {
    try {
      const dashboard = await this.estadisticasService.getDashboard();
      const response: ApiResponse<any> = {
        success: true,
        data: dashboard,
        message: 'Dashboard obtenido exitosamente',
        timestamp: new Date()
      };
      return response;
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          error: error.message,
          timestamp: new Date()
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
