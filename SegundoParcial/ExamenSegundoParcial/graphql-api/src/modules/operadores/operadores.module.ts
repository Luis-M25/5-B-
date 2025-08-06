import { Module } from '@nestjs/common';
import { OperadoresResolver } from './operadores.resolver';
import { OperadoresService } from './operadores.service';

@Module({
  providers: [OperadoresResolver, OperadoresService],
  exports: [OperadoresService],
})
export class OperadoresModule {}
