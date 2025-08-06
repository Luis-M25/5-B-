import { Query, Mutation, Resolver, Args, ID } from '@nestjs/graphql';
import { ClientesService } from './clientes.service';
import { Cliente } from '../../shared/models';
import { CreateClienteInput } from '../../shared/inputs';

@Resolver(() => Cliente)
export class ClientesResolver {
  constructor(private readonly clientesService: ClientesService) {}

  @Query(() => [Cliente], { name: 'clientes' })
  async findAll() {
    return this.clientesService.findAll();
  }

  @Query(() => Cliente, { name: 'cliente', nullable: true })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return this.clientesService.findOne(id);
  }

  @Query(() => Cliente, { name: 'clientePorCedula', nullable: true })
  async findByCedula(@Args('cedula') cedula: string) {
    return this.clientesService.findByCedula(cedula);
  }

  @Mutation(() => Cliente)
  async createCliente(@Args('createClienteInput') createClienteInput: CreateClienteInput) {
    return this.clientesService.create(createClienteInput);
  }
}
