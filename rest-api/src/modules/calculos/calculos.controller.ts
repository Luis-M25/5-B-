import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { CalculosService } from './calculos.service';
import { CalcularCostoDto } from '../../../../shared/dtos';
import { ApiResponse } from '../../../../shared/interfaces';

@Controller('calculos')
export class CalculosController {
  constructor(private readonly calculosService: CalculosService) {}

  @Post('costo')
  async calcularCosto(@Body() calcularCostoDto: CalcularCostoDto) {
    try {
      const calculo = await this.calculosService.calcularCosto(
        calcularCostoDto.tipoGasolina,
        calcularCostoDto.litros
      );

      if (!calculo) {
        throw new HttpException(
          {
            success: false,
            error: 'No se pudo calcular el costo. Verifique el tipo de gasolina.',
            timestamp: new Date()
          },
          HttpStatus.BAD_REQUEST
        );
      }

      const response: ApiResponse<any> = {
        success: true,
        data: calculo,
        message: 'Costo calculado exitosamente',
        timestamp: new Date()
      };
      return response;
    } catch (error) {
      if (error instanceof HttpException) throw error;
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
