import { Query, Mutation, Resolver, Args, ID } from '@nestjs/graphql';
import { SurtidoresService } from './surtidores.service';
import { Surtidor } from '../../shared/models';
import { CreateSurtidorInput, UpdateSurtidorInput, SurtidorFilterInput } from '../../shared/inputs';

@Resolver(() => Surtidor)
export class SurtidoresResolver {
  constructor(private readonly surtidoresService: SurtidoresService) {}

  @Query(() => [Surtidor], { name: 'surtidores' })
  async findAll(@Args('filter', { nullable: true }) filter?: SurtidorFilterInput) {
    return this.surtidoresService.findAll(filter);
  }

  @Query(() => [Surtidor], { name: 'surtidoresDisponibles' })
  async findDisponibles() {
    return this.surtidoresService.findDisponibles();
  }

  @Query(() => Surtidor, { name: 'surtidor', nullable: true })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return this.surtidoresService.findOne(id);
  }

  @Mutation(() => Surtidor)
  async createSurtidor(@Args('createSurtidorInput') createSurtidorInput: CreateSurtidorInput) {
    return this.surtidoresService.create(createSurtidorInput);
  }

  @Mutation(() => Surtidor, { nullable: true })
  async updateSurtidor(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateSurtidorInput') updateSurtidorInput: UpdateSurtidorInput,
  ) {
    return this.surtidoresService.update(id, updateSurtidorInput);
  }

  @Mutation(() => Surtidor, { nullable: true })
  async updateEstadoSurtidor(
    @Args('id', { type: () => ID }) id: string,
    @Args('estado') estado: string,
  ) {
    return this.surtidoresService.updateEstado(id, estado);
  }
}
