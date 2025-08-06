import { Query, Resolver } from '@nestjs/graphql';
import { FormaPago } from '../../shared/models';

@Resolver(() => FormaPago)
export class FormasPagoResolver {
  @Query(() => [FormaPago], { name: 'formasPago' })
  async findAll() {
    return [];
  }
}
