import { CreateClaseDto, UpdateClaseDto } from '../dtos';
import { ClaseEntity } from '../entities/clase.entity';

export abstract class ClaseRepository {

  abstract create(createClaseDto: CreateClaseDto): Promise<ClaseEntity>;
  abstract getAll(): Promise<ClaseEntity[]>;
  abstract findById(id: string): Promise<ClaseEntity>;
  abstract updateById(updateClaseDto: UpdateClaseDto): Promise<ClaseEntity>;
  abstract deleteById(id: string): Promise<ClaseEntity>;
  abstract findByInstructor(instructor: string): Promise<ClaseEntity[]>;
  abstract incrementarEstudiantes(id: string): Promise<void>;
  abstract decrementarEstudiantes(id: string): Promise<void>;

}
