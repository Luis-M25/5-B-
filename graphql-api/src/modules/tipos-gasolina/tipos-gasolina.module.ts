import { Module } from '@nestjs/common';
import { TiposGasolinaResolver } from './tipos-gasolina.resolver';
import { TiposGasolinaService } from './tipos-gasolina.service';

@Module({
  providers: [TiposGasolinaResolver, TiposGasolinaService],
  exports: [TiposGasolinaService],
})
export class TiposGasolinaModule {}
