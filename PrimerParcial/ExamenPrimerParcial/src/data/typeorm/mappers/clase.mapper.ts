import { Clase } from '../../../domain/entities/clase.entity';
import { ClaseEntity } from '../entities/clase.entity';

export class ClaseMapper {
  
  static toDomain(entity: ClaseEntity): Clase {
    return new Clase(
      entity.id,
      entity.nombre,
      entity.descripcion,
      entity.horario,
      entity.cupoMaximo,
      entity.instructorId,
      entity.fechaCreacion,
      entity.fechaActualizacion
    );
  }

  static toDomainArray(entities: ClaseEntity[]): Clase[] {
    return entities.map(entity => this.toDomain(entity));
  }

  static toEntity(domain: Clase): ClaseEntity {
    const entity = new ClaseEntity();
    entity.id = domain.id;
    entity.nombre = domain.nombre;
    entity.descripcion = domain.descripcion;
    entity.horario = domain.horario;
    entity.cupoMaximo = domain.cupoMaximo;
    entity.instructorId = domain.instructorId;
    entity.fechaCreacion = domain.fechaCreacion;
    entity.fechaActualizacion = domain.fechaActualizacion;
    return entity;
  }

  static toEntityArray(domains: Clase[]): ClaseEntity[] {
    return domains.map(domain => this.toEntity(domain));
  }

  static toCreateEntity(domain: Omit<Clase, 'id' | 'fechaCreacion' | 'fechaActualizacion'>): Omit<ClaseEntity, 'id' | 'fechaCreacion' | 'fechaActualizacion'> {
    const entity = new ClaseEntity();
    entity.nombre = domain.nombre;
    entity.descripcion = domain.descripcion;
    entity.horario = domain.horario;
    entity.cupoMaximo = domain.cupoMaximo;
    entity.instructorId = domain.instructorId;
    return entity;
  }
}