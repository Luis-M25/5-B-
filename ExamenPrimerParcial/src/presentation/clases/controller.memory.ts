import { Request, Response } from 'express';
import { CreateClaseUseCase } from '../../domain/use-cases/clases/create-clase';
import { GetClasesUseCase } from '../../domain/use-cases/clases/get-clases';
import { GetClaseUseCase } from '../../domain/use-cases/clases/get-clase';
import { UpdateClaseUseCase } from '../../domain/use-cases/clases/update-clase';
import { DeleteClaseUseCase } from '../../domain/use-cases/clases/delete-clase';
import { ClaseEntity } from '../../domain/entities/clase.entity';

interface Clase {
  id: number;
  nombre: string;
  descripcion: string;
  profesor: string;
  horario: string;
}

export class ClasesMemoryController {
  private clases: Clase[] = [];
  private nextId: number = 1;

  constructor(
    private readonly createClaseUseCase: CreateClaseUseCase,
    private readonly getClasesUseCase: GetClasesUseCase,
    private readonly getClaseUseCase: GetClaseUseCase,
    private readonly updateClaseUseCase: UpdateClaseUseCase,
    private readonly deleteClaseUseCase: DeleteClaseUseCase
  ) {}

  public getClases = async (req: Request, res: Response) => {
    try {
      const clases = await this.getClasesUseCase.execute();
      res.json({
        message: 'Clases obtenidas exitosamente',
        data: clases,
        total: clases.length
      });
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  public getClaseById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const clase = await this.getClaseUseCase.execute(id);
      
      res.json({
        message: 'Clase encontrada',
        data: clase
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Clase no encontrada') {
          return res.status(404).json({ error: error.message });
        }
        if (error.message === 'ID de clase inválido') {
          return res.status(400).json({ error: error.message });
        }
      }
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  public createClase = async (req: Request, res: Response) => {
    try {
      const claseData = req.body;
      const nuevaClase = await this.createClaseUseCase.execute(claseData);

      res.status(201).json({
        message: 'Clase creada exitosamente',
        data: nuevaClase
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  public updateClase = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      
      const claseActualizada = await this.updateClaseUseCase.execute(id, updateData);

      res.json({
        message: 'Clase actualizada exitosamente',
        data: claseActualizada
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Clase no encontrada') {
          return res.status(404).json({ error: error.message });
        }
        if (error.message.includes('inválido') || error.message.includes('vacío')) {
          return res.status(400).json({ error: error.message });
        }
      }
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  public deleteClase = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const claseEliminada = await this.deleteClaseUseCase.execute(id);

      res.json({
        message: 'Clase eliminada exitosamente',
        data: claseEliminada
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Clase no encontrada') {
          return res.status(404).json({ error: error.message });
        }
        if (error.message === 'ID de clase inválido') {
          return res.status(400).json({ error: error.message });
        }
      }
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
}
