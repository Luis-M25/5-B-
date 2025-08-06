import { Module } from '@nestjs/common';
import { ClientesResolver } from './clientes.resolver';
import { ClientesService } from './clientes.service';

@Module({
  providers: [ClientesResolver, ClientesService],
  exports: [ClientesService],
})
export class ClientesModule {}
