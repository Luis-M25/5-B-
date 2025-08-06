import { Module } from '@nestjs/common';
import { VentasSimpleService } from './ventas-simple.service';
import { DataPersistenceServiceLocal } from '../../shared/data-persistence-local.service';

@Module({
  providers: [VentasSimpleService, DataPersistenceServiceLocal],
  exports: [VentasSimpleService],
})
export class VentasModule {}
