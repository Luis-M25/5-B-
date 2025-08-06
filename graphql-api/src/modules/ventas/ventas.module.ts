import { Module } from '@nestjs/common';
import { VentasResolver } from './ventas.resolver';
import { VentasService } from './ventas.service';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [VentasResolver, VentasService],
  exports: [VentasService],
})
export class VentasModule {}
