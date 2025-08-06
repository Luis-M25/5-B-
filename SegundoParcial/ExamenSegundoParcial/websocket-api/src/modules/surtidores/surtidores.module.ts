import { Module } from '@nestjs/common';
import { SurtidoresService } from './surtidores.service';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [SurtidoresService],
  exports: [SurtidoresService],
})
export class SurtidoresModule {}
