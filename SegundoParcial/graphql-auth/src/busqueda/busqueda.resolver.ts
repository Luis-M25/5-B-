import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BusquedaService } from './busqueda.service';
import { Busqueda } from './busqueda.entity';
import { CreateBusquedaInput } from './dto/create-busqueda.input';
import { UpdateBusquedaInput } from './dto/update-busqueda.input';

@Resolver(() => Busqueda)
export class BusquedaResolver {
  constructor(private readonly busquedaService: BusquedaService) {}

  @Mutation(() => Busqueda)
  createBusqueda(@Args('createBusquedaInput') createBusquedaInput: CreateBusquedaInput) {
    return this.busquedaService.create(createBusquedaInput);
  }

  @Query(() => [Busqueda], { name: 'busquedas' })
  findAll() {
    return this.busquedaService.findAll();
  }

  @Query(() => Busqueda, { name: 'busqueda' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.busquedaService.findOne(id);
  }

  @Mutation(() => Busqueda)
  updateBusqueda(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateBusquedaInput') updateBusquedaInput: UpdateBusquedaInput,
  ) {
    return this.busquedaService.update(id, updateBusquedaInput);
  }

  @Mutation(() => Boolean)
  removeBusqueda(@Args('id', { type: () => Int }) id: number) {
    return this.busquedaService.remove(id);
  }
}
