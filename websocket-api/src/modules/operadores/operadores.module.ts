import { Module } from '@nestjs/common';
import { OperadoresService } from './operadores.service';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [OperadoresService],
  exports: [OperadoresService],
})
export class OperadoresModule {}
