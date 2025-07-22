import { Router } from 'express';
import { ClasesMemoryController } from './controller.memory';

export class ClasesMemoryRoutes {

  static get routes(): Router {
    const router = Router();
    
    // Aquí necesitarías inyectar los casos de uso
    // const controller = new ClasesMemoryController(createUseCase, getUseCases, etc.);
    
    // Por ahora creamos una instancia básica
    // const controller = new ClasesMemoryController();

    // Rutas para clases
    router.get('/', /* controller.getClases */);
    router.get('/:id', /* controller.getClaseById */);
    router.post('/', /* controller.createClase */);
    router.put('/:id', /* controller.updateClase */);
    router.delete('/:id', /* controller.deleteClase */);

    return router;
  }
}
