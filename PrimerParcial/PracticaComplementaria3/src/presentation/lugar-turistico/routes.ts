import { Router } from 'express';
import { LugarTuristicoController } from './controller';
import { DatasourceConfig, DatasourceType } from '../../infrastructure/datasource/datasource.config';
import { LugarTuristicoRepositoryImpl } from '../../infrastructure/repositories/lugar-turistico.repository.impl';

export class LugarTuristicoRoutes {
    static get routes(): Router {
        const router = Router();

        // CAMBIAR DE TYPEORM A IN_MEMORY
        const datasource = DatasourceConfig.getDatasource( DatasourceType.IN_MEMORY );
        const lugarTuristicoRepository = new LugarTuristicoRepositoryImpl(datasource);
        const lugarTuristicoController = new LugarTuristicoController(lugarTuristicoRepository);

        router.get('/', lugarTuristicoController.getLugaresTuristicos);
        router.get('/:id', lugarTuristicoController.getLugarTuristicoById);
        router.post('/', lugarTuristicoController.createLugarTuristico);
        router.put('/:id', lugarTuristicoController.updateLugarTuristico);
        router.delete('/:id', lugarTuristicoController.deleteLugarTuristico);

        return router;
    }
}
