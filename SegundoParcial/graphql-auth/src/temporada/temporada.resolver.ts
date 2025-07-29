import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TemporadaService } from './temporada.service';
import { Temporada } from './temporada.entity';
import { CreateTemporadaInput } from './dto/create-temporada.input';
import { UpdateTemporadaInput } from './dto/update-temporada.input';

@Resolver(() => Temporada)
export class TemporadaResolver {
  constructor(private readonly temporadaService: TemporadaService) {}

  @Mutation(() => Temporada)
  createTemporada(@Args('createTemporadaInput') createTemporadaInput: CreateTemporadaInput) {
    return this.temporadaService.create(createTemporadaInput);
  }

  @Query(() => [Temporada], { name: 'temporadas' })
  findAll() {
    return this.temporadaService.findAll();
  }

  @Query(() => Temporada, { name: 'temporada' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.temporadaService.findOne(id);
  }

  @Mutation(() => Temporada)
  updateTemporada(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateTemporadaInput') updateTemporadaInput: UpdateTemporadaInput,
  ) {
    return this.temporadaService.update(id, updateTemporadaInput);
  }

  @Mutation(() => Boolean)
  removeTemporada(@Args('id', { type: () => Int }) id: number) {
    return this.temporadaService.remove(id);
  }
}
