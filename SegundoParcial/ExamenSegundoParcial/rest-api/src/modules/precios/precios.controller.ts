import { Controller, Get, Put, Body, Param, HttpStatus, HttpException } from '@nestjs/common';
import { PreciosService } from './precios.service';
import { UpdatePrecioDto } from '../../../../shared/dtos';
import { ApiResponse } from '../../../../shared/interfaces';

@Controller('precios')
export class PreciosController {
  constructor(private readonly preciosService: PreciosService) {}

  @Get()
  async findAll() {
    try {
      const precios = await this.preciosService.findAll();
      const response: ApiResponse<any> = {
        success: true,
        data: precios,
        message: 'Precios obtenidos exitosamente',
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

  @Get('activos')
  async findActivos() {
    try {
      const precios = await this.preciosService.findActivos();
      const response: ApiResponse<any> = {
        success: true,
        data: precios,
        message: 'Precios activos obtenidos exitosamente',
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

  @Get(':tipoGasolina')
  async findByTipoGasolina(@Param('tipoGasolina') tipoGasolina: string) {
    try {
      const precio = await this.preciosService.findByTipoGasolina(tipoGasolina);
      if (!precio) {
        throw new HttpException(
          {
            success: false,
            error: 'Precio no encontrado para el tipo de gasolina especificado',
            timestamp: new Date()
          },
          HttpStatus.NOT_FOUND
        );
      }

      const response: ApiResponse<any> = {
        success: true,
        data: precio,
        message: 'Precio obtenido exitosamente',
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

  @Put(':tipoGasolina')
  async updatePrecio(@Param('tipoGasolina') tipoGasolina: string, @Body() updatePrecioDto: UpdatePrecioDto) {
    try {
      const precioLitro = updatePrecioDto.precioLitro;
      if (precioLitro === undefined) {
        throw new HttpException(
          {
            success: false,
            error: 'El precio por litro es requerido',
            timestamp: new Date()
          },
          HttpStatus.BAD_REQUEST
        );
      }
      
      const precio = await this.preciosService.updatePrecio(tipoGasolina, precioLitro);
      if (!precio) {
        throw new HttpException(
          {
            success: false,
            error: 'Precio no encontrado para el tipo de gasolina especificado',
            timestamp: new Date()
          },
          HttpStatus.NOT_FOUND
        );
      }

      const response: ApiResponse<any> = {
        success: true,
        data: precio,
        message: 'Precio actualizado exitosamente',
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
