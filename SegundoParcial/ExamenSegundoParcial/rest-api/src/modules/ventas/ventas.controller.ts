import { Controller, Get, Post, Put, Body, Param, Query, HttpStatus, HttpException } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { CreateVentaDto, UpdateVentaDto, VentaFilterDto } from '../../../../shared/dtos';
import { ApiResponse } from '../../../../shared/interfaces';

@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Get()
  async findAll(@Query() filterDto: VentaFilterDto) {
    try {
      const result = await this.ventasService.findAll(filterDto);
      const response: ApiResponse<any> = {
        success: true,
        data: result,
        message: 'Ventas obtenidas exitosamente',
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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const venta = await this.ventasService.findOne(id);
      if (!venta) {
        throw new HttpException(
          {
            success: false,
            error: 'Venta no encontrada',
            timestamp: new Date()
          },
          HttpStatus.NOT_FOUND
        );
      }

      const response: ApiResponse<any> = {
        success: true,
        data: venta,
        message: 'Venta obtenida exitosamente',
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

  @Post()
  async create(@Body() createVentaDto: CreateVentaDto) {
    try {
      const venta = await this.ventasService.create(createVentaDto);
      const response: ApiResponse<any> = {
        success: true,
        data: venta,
        message: 'Venta creada exitosamente',
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
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateVentaDto: UpdateVentaDto) {
    try {
      const venta = await this.ventasService.update(id, updateVentaDto);
      if (!venta) {
        throw new HttpException(
          {
            success: false,
            error: 'Venta no encontrada',
            timestamp: new Date()
          },
          HttpStatus.NOT_FOUND
        );
      }

      const response: ApiResponse<any> = {
        success: true,
        data: venta,
        message: 'Venta actualizada exitosamente',
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

  @Put(':id/completar')
  async completarVenta(@Param('id') id: string) {
    try {
      const venta = await this.ventasService.completarVenta(id);
      if (!venta) {
        throw new HttpException(
          {
            success: false,
            error: 'Venta no encontrada',
            timestamp: new Date()
          },
          HttpStatus.NOT_FOUND
        );
      }

      const response: ApiResponse<any> = {
        success: true,
        data: venta,
        message: 'Venta completada exitosamente',
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

  @Put(':id/cancelar')
  async cancelarVenta(@Param('id') id: string) {
    try {
      const venta = await this.ventasService.cancelarVenta(id);
      if (!venta) {
        throw new HttpException(
          {
            success: false,
            error: 'Venta no encontrada',
            timestamp: new Date()
          },
          HttpStatus.NOT_FOUND
        );
      }

      const response: ApiResponse<any> = {
        success: true,
        data: venta,
        message: 'Venta cancelada exitosamente',
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
