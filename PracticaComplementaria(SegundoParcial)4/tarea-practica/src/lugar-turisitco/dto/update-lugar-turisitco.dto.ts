import { PartialType } from '@nestjs/mapped-types';
import { CreateLugarTurisitcoDto } from './create-lugar-turisitco.dto';

export class UpdateLugarTurisitcoDto extends PartialType(CreateLugarTurisitcoDto) {}
