import { Router } from 'express';
import { BusquedaController } from './controller';
import { DatasourceConfig, DatasourceType } from '../../infrastructure/datasource/datasource.config';
import { BusquedaRepositoryImpl } from '../../infrastructure/repositories/busqueda.repository.impl';

export class BusquedaRoutes {
    static get routes(): Router {
        const router = Router();

        // CAMBIAR DE TYPEORM A IN_MEMORY
        const datasource = DatasourceConfig.getBusquedaDatasource( DatasourceType.IN_MEMORY )!;
        const busquedaRepository = new BusquedaRepositoryImpl(datasource);
        const busquedaController = new BusquedaController(busquedaRepository);

        router.get('/', busquedaController.getBusquedas);
        router.get('/:id', busquedaController.getBusquedaById);
        router.post('/', busquedaController.createBusqueda);
        router.delete('/:id', busquedaController.deleteBusqueda);

        return router;
    }
}
