import { Router } from 'express';
import { ClasesRoutes } from './clases/routes';

export class AppRoutes {

  static get routes(): Router {
    const router = Router();
    
    // Rutas principales de la aplicación
    router.use('/api/clases', ClasesRoutes.routes);
    
    return router;
  }
}
