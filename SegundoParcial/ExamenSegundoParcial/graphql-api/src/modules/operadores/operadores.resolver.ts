import { Query, Mutation, Resolver, Args, ID, Int } from '@nestjs/graphql';
import { OperadoresService } from './operadores.service';
import { Operador } from '../../shared/models';
import { CreateOperadorInput, UpdateOperadorInput } from '../../shared/inputs';

@Resolver(() => Operador)
export class OperadoresResolver {
  constructor(private readonly operadoresService: OperadoresService) {}

  @Query(() => [Operador], { name: 'operadores' })
  async findAll() {
    return this.operadoresService.findAll();
  }

  @Query(() => Operador, { name: 'operador', nullable: true })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return this.operadoresService.findOne(id);
  }

  @Mutation(() => Operador)
  async createOperador(@Args('createOperadorInput') createOperadorInput: CreateOperadorInput) {
    return this.operadoresService.create(createOperadorInput);
  }

  @Mutation(() => Operador, { nullable: true })
  async updateOperador(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateOperadorInput') updateOperadorInput: UpdateOperadorInput,
  ) {
    return this.operadoresService.update(id, updateOperadorInput);
  }

  @Mutation(() => Boolean)
  async removeOperador(@Args('id', { type: () => ID }) id: string) {
    return this.operadoresService.remove(id);
  }
}
