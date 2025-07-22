import { Router } from 'express';
import { BusquedaRoutes } from './busqueda/routes';
import { LugarTuristicoRoutes } from './lugar-turistico/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/busquedas', BusquedaRoutes.routes );
    router.use('/api/lugares-turisticos', LugarTuristicoRoutes.routes );

    return router;
  }
}
