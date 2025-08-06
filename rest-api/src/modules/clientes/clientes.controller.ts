import { Controller, Get, Post, Put, Body, Param, HttpStatus, HttpException } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto, UpdateClienteDto } from '../../../../shared/dtos';
import { ApiResponse } from '../../../../shared/interfaces';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get()
  async findAll() {
    try {
      const clientes = await this.clientesService.findAll();
      const response: ApiResponse<any> = {
        success: true,
        data: clientes,
        message: 'Clientes obtenidos exitosamente',
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
      const cliente = await this.clientesService.findOne(id);
      if (!cliente) {
        throw new HttpException(
          {
            success: false,
            error: 'Cliente no encontrado',
            timestamp: new Date()
          },
          HttpStatus.NOT_FOUND
        );
      }

      const response: ApiResponse<any> = {
        success: true,
        data: cliente,
        message: 'Cliente obtenido exitosamente',
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

  @Get('cedula/:cedula')
  async findByCedula(@Param('cedula') cedula: string) {
    try {
      const cliente = await this.clientesService.findByCedula(cedula);
      if (!cliente) {
        throw new HttpException(
          {
            success: false,
            error: 'Cliente no encontrado',
            timestamp: new Date()
          },
          HttpStatus.NOT_FOUND
        );
      }

      const response: ApiResponse<any> = {
        success: true,
        data: cliente,
        message: 'Cliente obtenido exitosamente',
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
  async create(@Body() createClienteDto: CreateClienteDto) {
    try {
      const cliente = await this.clientesService.create(createClienteDto);
      const response: ApiResponse<any> = {
        success: true,
        data: cliente,
        message: 'Cliente creado exitosamente',
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
}
