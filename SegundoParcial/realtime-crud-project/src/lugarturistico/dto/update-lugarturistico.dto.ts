import { PartialType } from '@nestjs/mapped-types';
import { CreateLugarturisticoDto } from './create-lugarturistico.dto';

export class UpdateLugarturisticoDto extends PartialType(CreateLugarturisticoDto) {
  id: number;
}
