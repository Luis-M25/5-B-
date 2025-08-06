import { Module } from '@nestjs/common';
import { TiposGasolinaController } from './tipos-gasolina.controller';
import { TiposGasolinaService } from './tipos-gasolina.service';

@Module({
  controllers: [TiposGasolinaController],
  providers: [TiposGasolinaService],
  exports: [TiposGasolinaService],
})
export class TiposGasolinaModule {}
