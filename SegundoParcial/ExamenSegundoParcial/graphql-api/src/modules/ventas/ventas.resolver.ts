import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VentasService } from './ventas.service';
import { Venta, VentaType } from './venta.model';
import { CreateVentaInput } from './dto/create-venta.input';
import { UpdateVentaInput } from './dto/update-venta.input';

@Resolver(() => VentaType)
export class VentasResolver {
  constructor(private readonly ventasService: VentasService) {}

  @Query(() => [VentaType], { name: 'ventas' })
  async findAll(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ) {
    return this.ventasService.findAll(page, limit);
  }

  @Query(() => VentaType, { name: 'venta' })
  async findOne(@Args('id') id: string) {
    return this.ventasService.findOne(id);
  }

  @Query(() => [VentaType], { name: 'ventasPorOperador' })
  async findByOperador(@Args('operadorId') operadorId: string) {
    return this.ventasService.findByOperador(operadorId);
  }

  @Query(() => [VentaType], { name: 'ventasPorFecha' })
  async findByFecha(@Args('fecha') fecha: string) {
    return this.ventasService.findByFecha(fecha);
  }

  @Mutation(() => VentaType)
  async createVenta(@Args('input') createVentaInput: CreateVentaInput) {
    return this.ventasService.create(createVentaInput);
  }

  @Mutation(() => VentaType)
  async updateVenta(
    @Args('id') id: string,
    @Args('input') updateVentaInput: UpdateVentaInput,
  ) {
    return this.ventasService.update(id, updateVentaInput);
  }
}
