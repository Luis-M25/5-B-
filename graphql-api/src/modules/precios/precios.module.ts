import { Module } from '@nestjs/common';
import { PreciosResolver } from './precios.resolver';
import { PreciosService } from './precios.service';

@Module({
  providers: [PreciosResolver, PreciosService],
  exports: [PreciosService],
})
export class PreciosModule {}
