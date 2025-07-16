import { Request, Response } from 'express';

export class ClasesController {

  constructor() {}

  public getClases = (req: Request, res: Response) => {
    try {
      // Lógica para obtener todas las clases
      res.json({
        message: 'Obteniendo todas las clases',
        data: [],
        total: 0
      });
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  public getClaseById = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({ error: 'ID es requerido' });
      }

      res.json({
        message: `Obteniendo clase con ID: ${id}`,
        data: null
      });
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  public createClase = (req: Request, res: Response) => {
    try {
      const { nombre, descripcion, profesor, horario } = req.body;
      
      if (!nombre || !descripcion || !profesor || !horario) {
        return res.status(400).json({ 
          error: 'Todos los campos son requeridos: nombre, descripcion, profesor, horario' 
        });
      }

      const nuevaClase = {
        id: Date.now(), // ID temporal
        nombre,
        descripcion,
        profesor,
        horario,
        createdAt: new Date()
      };

      res.status(201).json({
        message: 'Clase creada exitosamente',
        data: nuevaClase
      });
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  public updateClase = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      if (!id) {
        return res.status(400).json({ error: 'ID es requerido' });
      }

      if (!updateData || Object.keys(updateData).length === 0) {
        return res.status(400).json({ 
          error: 'Debe proporcionar al menos un campo para actualizar' 
        });
      }

      res.json({
        message: `Clase con ID ${id} actualizada`,
        data: {
          id: parseInt(id),
          ...updateData,
          updatedAt: new Date()
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  public deleteClase = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({ error: 'ID es requerido' });
      }

      res.json({
        message: `Clase con ID ${id} eliminada`,
        data: {
          id: parseInt(id),
          deletedAt: new Date()
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
}
