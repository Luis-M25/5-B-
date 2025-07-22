import { Router, Request, Response } from 'express';
import { ClasesDatasource } from '../../data/datasource';

export class ClasesRoutes {
  static get routes(): Router {
    const router = Router();

    // Ruta de salud del servidor
    router.get('/health', (req, res) => {
      res.json({ status: 'OK', timestamp: new Date().toISOString() });
    });

    // Rutas de ejemplo
    router.get('/', (req, res) => {
      res.json({ message: 'Servidor funcionando correctamente' });
    });

    // Rutas API
    router.use('/api/users', this.getUserRoutes());
    router.use('/api/products', this.getProductRoutes());

    // GET /api/clases - Obtener todas las clases
    router.get('/api/clases', (req: Request, res: Response) => {
      try {
        const clases = ClasesDatasource.getAll();
        res.json({
          success: true,
          data: clases,
          count: clases.length
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Error al obtener las clases',
          error: error
        });
      }
    });

    // GET /api/clases/:id - Obtener una clase por ID
    router.get('/api/clases/:id', (req: Request, res: Response) => {
      try {
        const id = parseInt(req.params.id);
        const clase = ClasesDatasource.getById(id);
        
        if (!clase) {
          res.status(404).json({
            success: false,
            message: 'Clase no encontrada'
          });
          return;
        }

        res.json({
          success: true,
          data: clase
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Error al obtener la clase',
          error: error
        });
      }
    });
    // POST /api/clases - Crear una nueva clase
    router.post('/api/clases', (req: Request, res: Response) => {
      try {
        const { nombre, descripcion, profesor, creditos, horario } = req.body;
        
        if (!nombre || !descripcion || !profesor || !creditos || !horario) {
          res.status(400).json({
            success: false,
            message: 'Todos los campos son requeridos'
          });
          return;
        }

        const nuevaClase = ClasesDatasource.create({
          nombre,
          descripcion,
          profesor,
          creditos,
          horario
        });

        res.status(201).json({
          success: true,
          message: 'Clase creada exitosamente',
          data: nuevaClase
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Error al crear la clase',
          error: error
        });
      }
    });
    // PUT /api/clases/:id - Actualizar una clase
    router.put('/api/clases/:id', (req: Request, res: Response) => {
      try {
        const id = parseInt(req.params.id);
        const claseActualizada = ClasesDatasource.update(id, req.body);
        
        if (!claseActualizada) {
          res.status(404).json({
            success: false,
            message: 'Clase no encontrada'
          });
          return;
        }

        res.json({
          success: true,
          message: 'Clase actualizada exitosamente',
          data: claseActualizada
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Error al actualizar la clase',
          error: error
        });
      }
    });
    // DELETE /api/clases/:id - Eliminar una clase
    router.delete('/api/clases/:id', (req: Request, res: Response) => {
      try {
        const id = parseInt(req.params.id);
        const eliminada = ClasesDatasource.delete(id);
        
        if (!eliminada) {
          res.status(404).json({
            success: false,
            message: 'Clase no encontrada'
          });
          return;
        }

        res.json({
          success: true,
          message: 'Clase eliminada exitosamente'
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Error al eliminar la clase',
          error: error
        });
      }
    });

    return router;
  }

  private static getUserRoutes(): Router {
    const router = Router();
    
    router.get('/', (req, res) => {
      res.json({ users: [] });
    });
    
    router.post('/', (req, res) => {
      res.json({ message: 'Usuario creado' });
    });

    return router;
  }

  private static getProductRoutes(): Router {
    const router = Router();
    
    router.get('/', (req, res) => {
      res.json({ products: [] });
    });
    
    router.post('/', (req, res) => {
      res.json({ message: 'Producto creado' });
    });

    return router;
  }
}