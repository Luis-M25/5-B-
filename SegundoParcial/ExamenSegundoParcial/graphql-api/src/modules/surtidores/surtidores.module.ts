import { Module } from '@nestjs/common';
import { SurtidoresResolver } from './surtidores.resolver';
import { SurtidoresService } from './surtidores.service';

@Module({
  providers: [SurtidoresResolver, SurtidoresService],
  exports: [SurtidoresService],
})
export class SurtidoresModule {}
