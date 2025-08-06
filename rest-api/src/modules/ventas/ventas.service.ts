import { Injectable } from '@nestjs/common';
import { DataPersistenceService } from '../../../../shared/data-persistence.service';
import { CreateVentaDto, UpdateVentaDto, VentaFilterDto } from '../../../../shared/dtos';
import { Venta, VentaFilter, PaginatedResponse } from '../../../../shared/interfaces';

@Injectable()
export class VentasService {
  constructor(private readonly dataService: DataPersistenceService) {}

  async findAll(filterDto: VentaFilterDto): Promise<PaginatedResponse<Venta>> {
    const filter: VentaFilter = {};
    
    if (filterDto.operadorId) filter.operadorId = filterDto.operadorId;
    if (filterDto.surtidorId) filter.surtidorId = filterDto.surtidorId;
    if (filterDto.clienteId) filter.clienteId = filterDto.clienteId;
    if (filterDto.tipoGasolina) filter.tipoGasolina = filterDto.tipoGasolina;
    if (filterDto.formaPago) filter.formaPago = filterDto.formaPago;
    if (filterDto.estado) filter.estado = filterDto.estado;
    if (filterDto.fechaDesde) filter.fechaDesde = new Date(filterDto.fechaDesde);
    if (filterDto.fechaHasta) filter.fechaHasta = new Date(filterDto.fechaHasta);
    
    return await this.dataService.getAllVentas(filter, filterDto.page, filterDto.limit);
  }

  async findOne(id: string): Promise<Venta | null> {
    return await this.dataService.getVentaById(id);
  }

  async create(createVentaDto: CreateVentaDto): Promise<Venta> {
    // Calcular el costo total
    const calculo = await this.dataService.calcularCosto(createVentaDto.tipoGasolina, createVentaDto.litros);
    if (!calculo) {
      throw new Error('No se pudo calcular el costo de la venta');
    }

    const ventaData = {
      ...createVentaDto,
      precioLitro: calculo.precioLitro,
      montoTotal: calculo.total
    };

    return await this.dataService.createVenta(ventaData);
  }

  async update(id: string, updateVentaDto: UpdateVentaDto): Promise<Venta | null> {
    return await this.dataService.updateVenta(id, updateVentaDto);
  }

  async completarVenta(id: string): Promise<Venta | null> {
    return await this.dataService.updateVenta(id, { estado: 'completada' });
  }

  async cancelarVenta(id: string): Promise<Venta | null> {
    return await this.dataService.updateVenta(id, { estado: 'cancelada' });
  }
}
