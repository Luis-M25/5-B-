import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ValoracionService } from './valoracion.service';
import { Valoracion } from './valoracion.entity';
import { CreateValoracionInput } from './dto/create-valoracion.input';
import { UpdateValoracionInput } from './dto/update-valoracion.input';

@Resolver(() => Valoracion)
export class ValoracionResolver {
  constructor(private readonly valoracionService: ValoracionService) {}

  @Mutation(() => Valoracion)
  createValoracion(@Args('createValoracionInput') createValoracionInput: CreateValoracionInput) {
    return this.valoracionService.create(createValoracionInput);
  }

  @Query(() => [Valoracion], { name: 'valoraciones' })
  findAll() {
    return this.valoracionService.findAll();
  }

  @Query(() => Valoracion, { name: 'valoracion' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.valoracionService.findOne(id);
  }

  @Mutation(() => Valoracion)
  updateValoracion(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateValoracionInput') updateValoracionInput: UpdateValoracionInput,
  ) {
    return this.valoracionService.update(id, updateValoracionInput);
  }

  @Mutation(() => Boolean)
  removeValoracion(@Args('id', { type: () => Int }) id: number) {
    return this.valoracionService.remove(id);
  }
}
