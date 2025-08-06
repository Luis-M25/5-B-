import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CalculosService } from './calculos.service';
import { 
  CalculoResultType, 
  ComparacionPreciosType, 
  CalcularCostoDetalladoInput, 
  SimulacionVentaInput 
} from './dto/calculo.dto';

@Resolver(() => CalculoResultType)
export class CalculosResolver {
  constructor(private readonly calculosService: CalculosService) {}

  @Query(() => CalculoResultType)
  async calcularCosto(
    @Args('input') input: CalcularCostoDetalladoInput
  ): Promise<CalculoResultType> {
    return this.calculosService.calcularCostoDetallado(input);
  }

  @Query(() => CalculoResultType)
  async calcularCostoBasico(
    @Args('tipoGasolina') tipoGasolina: string,
    @Args('litros') litros: number
  ): Promise<CalculoResultType> {
    return this.calculosService.calcularCostoBasico(tipoGasolina, litros);
  }

  @Query(() => CalculoResultType)
  async simularVenta(
    @Args('input') input: SimulacionVentaInput
  ): Promise<CalculoResultType> {
    return this.calculosService.simularVenta(input);
  }

  @Query(() => [ComparacionPreciosType])
  async compararPrecios(): Promise<ComparacionPreciosType[]> {
    return this.calculosService.compararPrecios();
  }

  @Query(() => Boolean)
  async validarCapacidadSurtidor(
    @Args('surtidorId') surtidorId: string,
    @Args('litros') litros: number
  ): Promise<boolean> {
    return this.calculosService.validarCapacidadSurtidor(surtidorId, litros);
  }

  @Query(() => Number)
  async estimarTiempoDespacho(
    @Args('litros') litros: number
  ): Promise<number> {
    return this.calculosService.estimarTiempoDespacho(litros);
  }
}
