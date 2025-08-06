import { Module } from '@nestjs/common';
import { CalculosResolver } from './calculos.resolver';
import { CalculosService } from './calculos.service';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [CalculosResolver, CalculosService],
  exports: [CalculosService],
})
export class CalculosModule {}
