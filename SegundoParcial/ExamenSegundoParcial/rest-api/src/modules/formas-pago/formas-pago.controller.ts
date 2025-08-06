import { Controller, Get, HttpStatus, HttpException } from '@nestjs/common';
import { FormasPagoService } from './formas-pago.service';
import { ApiResponse } from '../../../../shared/interfaces';

@Controller('formas-pago')
export class FormasPagoController {
  constructor(private readonly formasPagoService: FormasPagoService) {}

  @Get()
  async findAll() {
    try {
      const formas = await this.formasPagoService.findAll();
      const response: ApiResponse<any> = {
        success: true,
        data: formas,
        message: 'Formas de pago obtenidas exitosamente',
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

  @Get('activas')
  async findActivas() {
    try {
      const formas = await this.formasPagoService.findActivas();
      const response: ApiResponse<any> = {
        success: true,
        data: formas,
        message: 'Formas de pago activas obtenidas exitosamente',
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
