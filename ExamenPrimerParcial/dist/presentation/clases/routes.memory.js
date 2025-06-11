"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClasesMemoryRoutes = void 0;
const express_1 = require("express");
class ClasesMemoryRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        // Aquí necesitarías inyectar los casos de uso
        // const controller = new ClasesMemoryController(createUseCase, getUseCases, etc.);
        // Por ahora creamos una instancia básica
        // const controller = new ClasesMemoryController();
        // Rutas para clases
        router.get('/');
        router.get('/:id');
        router.post('/');
        router.put('/:id');
        router.delete('/:id');
        return router;
    }
}
exports.ClasesMemoryRoutes = ClasesMemoryRoutes;
