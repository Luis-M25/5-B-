import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { PreciosService } from './precios.service';
import { Precio } from '../../shared/models';
import { UpdatePrecioInput } from '../../shared/inputs';

@Resolver(() => Precio)
export class PreciosResolver {
  constructor(private readonly preciosService: PreciosService) {}

  @Query(() => [Precio], { name: 'precios' })
  async findAll() {
    return this.preciosService.findAll();
  }

  @Query(() => [Precio], { name: 'preciosActivos' })
  async findActivos() {
    return this.preciosService.findActivos();
  }

  @Query(() => Precio, { name: 'precioPorTipo', nullable: true })
  async findByTipoGasolina(@Args('tipoGasolina') tipoGasolina: string) {
    return this.preciosService.findByTipoGasolina(tipoGasolina);
  }

  @Mutation(() => Precio, { nullable: true })
  async updatePrecio(
    @Args('tipoGasolina') tipoGasolina: string,
    @Args('updatePrecioInput') updatePrecioInput: UpdatePrecioInput,
  ) {
    return this.preciosService.updatePrecio(tipoGasolina, updatePrecioInput.precioLitro);
  }
}
