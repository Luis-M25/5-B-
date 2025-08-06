import { Module } from '@nestjs/common';
import { GasolineraGateway } from './gasolinera.gateway';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [GasolineraGateway],
  exports: [GasolineraGateway],
})
export class GatewaysModule {}
