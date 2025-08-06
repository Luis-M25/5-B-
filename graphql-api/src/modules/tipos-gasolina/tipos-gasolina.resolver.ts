import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { TiposGasolinaService } from './tipos-gasolina.service';
import { TipoGasolinaType, FiltroTiposGasolinaInput } from './dto/tipo-gasolina.dto';

@Resolver(() => TipoGasolinaType)
export class TiposGasolinaResolver {
  constructor(private readonly tiposGasolinaService: TiposGasolinaService) {}

  @Query(() => [TipoGasolinaType])
  async tiposGasolina(): Promise<TipoGasolinaType[]> {
    return this.tiposGasolinaService.obtenerTiposGasolina();
  }

  @Query(() => [TipoGasolinaType])
  async tiposGasolinaDisponibles(): Promise<TipoGasolinaType[]> {
    return this.tiposGasolinaService.obtenerTiposDisponibles();
  }

  @Query(() => TipoGasolinaType, { nullable: true })
  async tipoGasolina(
    @Args('id', { type: () => ID }) id: string
  ): Promise<TipoGasolinaType | null> {
    return this.tiposGasolinaService.obtenerTipoGasolinaPorId(id);
  }

  @Query(() => Boolean)
  async verificarDisponibilidadGasolina(
    @Args('tipoGasolina') tipoGasolina: string,
    @Args('cantidadRequerida') cantidadRequerida: number
  ): Promise<boolean> {
    return this.tiposGasolinaService.verificarDisponibilidad(tipoGasolina, cantidadRequerida);
  }

  @Query(() => Number)
  async stockDisponible(
    @Args('tipoGasolina') tipoGasolina: string
  ): Promise<number> {
    return this.tiposGasolinaService.obtenerStockPorTipo(tipoGasolina);
  }
}
