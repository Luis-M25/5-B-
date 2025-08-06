import { Module } from '@nestjs/common';
import { GasolineraSimpleGateway } from './gateways/gasolinera-simple.gateway';
import { VentasModule } from './modules/ventas/ventas.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    SharedModule,
    VentasModule,
  ],
  providers: [GasolineraSimpleGateway],
})
export class AppModule {}
