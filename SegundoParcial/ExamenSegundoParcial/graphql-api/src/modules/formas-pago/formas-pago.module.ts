import { Module } from '@nestjs/common';
import { FormasPagoResolver } from './formas-pago.resolver';

@Module({
  providers: [FormasPagoResolver],
})
export class FormasPagoModule {}
