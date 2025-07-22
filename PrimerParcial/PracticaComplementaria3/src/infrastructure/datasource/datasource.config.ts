import { envs } from '../../config/envs';
import { LugarTuristicoDatasource } from '../../domain/datasources/lugar-turistico.datasource';
import { BusquedaDatasource } from '../../domain/datasources/busqueda.datasource';

// Importar implementaciones
import { LugarTuristicoDatasourceImpl } from './lugar-turistico.typeorm.datasource.impl';
import { BusquedaDatasourceImpl } from './busqueda.datasource.impl';
// TypeORM implementations (comentadas)
// import { LugarTuristicoTypeOrmDatasourceImpl } from './lugar-turistico.typeorm.datasource.impl';

export enum DatasourceType {
  IN_MEMORY = 'IN_MEMORY',
  TYPEORM = 'TYPEORM',
  MONGOOSE = 'MONGOOSE'
}

export class DatasourceConfig {
  static getDatasource(type: DatasourceType): LugarTuristicoDatasource {
    switch (type) {
      case DatasourceType.IN_MEMORY:
        return new LugarTuristicoDatasourceImpl();
      
      case DatasourceType.TYPEORM:
        // Desactivado temporalmente
        console.log('TypeORM disabled, using IN_MEMORY instead');
        return new LugarTuristicoDatasourceImpl();
        // return new LugarTuristicoTypeOrmDatasourceImpl();
      
      default:
        return new LugarTuristicoDatasourceImpl();
    }
  }

  static getBusquedaDatasource(type: DatasourceType): BusquedaDatasource {
    switch (type) {
      case DatasourceType.IN_MEMORY:
        return new BusquedaDatasourceImpl();
      
      case DatasourceType.TYPEORM:
        console.log('TypeORM disabled, using IN_MEMORY instead');
        return new BusquedaDatasourceImpl();
      
      default:
        return new BusquedaDatasourceImpl();
    }
  }
}
