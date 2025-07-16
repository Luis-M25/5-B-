"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClasesRoutes = void 0;
const express_1 = require("express");
const datasource_1 = require("../../data/datasource");
class ClasesRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
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
        router.get('/api/clases', (req, res) => {
            try {
                const clases = datasource_1.ClasesDatasource.getAll();
                res.json({
                    success: true,
                    data: clases,
                    count: clases.length
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Error al obtener las clases',
                    error: error
                });
            }
        });
        // GET /api/clases/:id - Obtener una clase por ID
        router.get('/api/clases/:id', (req, res) => {
            try {
                const id = parseInt(req.params.id);
                const clase = datasource_1.ClasesDatasource.getById(id);
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
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Error al obtener la clase',
                    error: error
                });
            }
        });
        // POST /api/clases - Crear una nueva clase
        router.post('/api/clases', (req, res) => {
            try {
                const { nombre, descripcion, profesor, creditos, horario } = req.body;
                if (!nombre || !descripcion || !profesor || !creditos || !horario) {
                    res.status(400).json({
                        success: false,
                        message: 'Todos los campos son requeridos'
                    });
                    return;
                }
                const nuevaClase = datasource_1.ClasesDatasource.create({
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
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Error al crear la clase',
                    error: error
                });
            }
        });
        // PUT /api/clases/:id - Actualizar una clase
        router.put('/api/clases/:id', (req, res) => {
            try {
                const id = parseInt(req.params.id);
                const claseActualizada = datasource_1.ClasesDatasource.update(id, req.body);
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
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Error al actualizar la clase',
                    error: error
                });
            }
        });
        // DELETE /api/clases/:id - Eliminar una clase
        router.delete('/api/clases/:id', (req, res) => {
            try {
                const id = parseInt(req.params.id);
                const eliminada = datasource_1.ClasesDatasource.delete(id);
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
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Error al eliminar la clase',
                    error: error
                });
            }
        });
        return router;
    }
    static getUserRoutes() {
        const router = (0, express_1.Router)();
        router.get('/', (req, res) => {
            res.json({ users: [] });
        });
        router.post('/', (req, res) => {
            res.json({ message: 'Usuario creado' });
        });
        return router;
    }
    static getProductRoutes() {
        const router = (0, express_1.Router)();
        router.get('/', (req, res) => {
            res.json({ products: [] });
        });
        router.post('/', (req, res) => {
            res.json({ message: 'Producto creado' });
        });
        return router;
    }
}
exports.ClasesRoutes = ClasesRoutes;
