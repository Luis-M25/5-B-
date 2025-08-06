"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClasesController = void 0;
class ClasesController {
    constructor(createClaseUseCase, getClasesUseCase, getClaseUseCase, updateClaseUseCase, deleteClaseUseCase) {
        this.createClaseUseCase = createClaseUseCase;
        this.getClasesUseCase = getClasesUseCase;
        this.getClaseUseCase = getClaseUseCase;
        this.updateClaseUseCase = updateClaseUseCase;
        this.deleteClaseUseCase = deleteClaseUseCase;
        this.getClases = async (req, res) => {
            try {
                const clases = await this.getClasesUseCase.execute();
                res.json({
                    message: 'Clases obtenidas exitosamente',
                    data: clases,
                    total: clases.length
                });
            }
            catch (error) {
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        };
        this.getClaseById = async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                const clase = await this.getClaseUseCase.execute(id);
                res.json({
                    message: 'Clase encontrada',
                    data: clase
                });
            }
            catch (error) {
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
        this.createClase = async (req, res) => {
            try {
                const claseData = req.body;
                const nuevaClase = await this.createClaseUseCase.execute(claseData);
                res.status(201).json({
                    message: 'Clase creada exitosamente',
                    data: nuevaClase
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).json({ error: error.message });
                }
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        };
        this.updateClase = async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                const updateData = req.body;
                const claseActualizada = await this.updateClaseUseCase.execute(id, updateData);
                res.json({
                    message: 'Clase actualizada exitosamente',
                    data: claseActualizada
                });
            }
            catch (error) {
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
        this.deleteClase = async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                const claseEliminada = await this.deleteClaseUseCase.execute(id);
                res.json({
                    message: 'Clase eliminada exitosamente',
                    data: claseEliminada
                });
            }
            catch (error) {
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
}
exports.ClasesController = ClasesController;
