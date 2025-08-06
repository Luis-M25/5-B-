import { Controller, Get, HttpStatus, HttpException } from '@nestjs/common';
import { TiposGasolinaService } from './tipos-gasolina.service';
import { ApiResponse } from '../../../../shared/interfaces';

@Controller('tipos-gasolina')
export class TiposGasolinaController {
  constructor(private readonly tiposGasolinaService: TiposGasolinaService) {}

  @Get()
  async findAll() {
    try {
      const tipos = await this.tiposGasolinaService.findAll();
      const response: ApiResponse<any> = {
        success: true,
        data: tipos,
        message: 'Tipos de gasolina obtenidos exitosamente',
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

  @Get('disponibles')
  async findDisponibles() {
    try {
      const tipos = await this.tiposGasolinaService.findDisponibles();
      const response: ApiResponse<any> = {
        success: true,
        data: tipos,
        message: 'Tipos de gasolina disponibles obtenidos exitosamente',
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
