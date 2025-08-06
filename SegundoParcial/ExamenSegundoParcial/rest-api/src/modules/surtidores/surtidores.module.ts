import { Module } from '@nestjs/common';
import { SurtidoresController } from './surtidores.controller';
import { SurtidoresService } from './surtidores.service';

@Module({
  controllers: [SurtidoresController],
  providers: [SurtidoresService],
  exports: [SurtidoresService],
})
export class SurtidoresModule {}
