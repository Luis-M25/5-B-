import { Module } from '@nestjs/common';
import { OperadoresModule } from './modules/operadores/operadores.module';
import { SurtidoresModule } from './modules/surtidores/surtidores.module';
import { TiposGasolinaModule } from './modules/tipos-gasolina/tipos-gasolina.module';
import { PreciosModule } from './modules/precios/precios.module';
import { FormasPagoModule } from './modules/formas-pago/formas-pago.module';
import { ClientesModule } from './modules/clientes/clientes.module';
import { VentasModule } from './modules/ventas/ventas.module';
import { CalculosModule } from './modules/calculos/calculos.module';
import { EstadisticasModule } from './modules/estadisticas/estadisticas.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    SharedModule,
    OperadoresModule,
    SurtidoresModule,
    TiposGasolinaModule,
    PreciosModule,
    FormasPagoModule,
    ClientesModule,
    VentasModule,
    CalculosModule,
    EstadisticasModule,
  ],
})
export class AppModule {}
