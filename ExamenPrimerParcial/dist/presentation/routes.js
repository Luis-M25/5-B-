"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const routes_1 = require("./clases/routes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        // Rutas principales de la aplicación
        router.use('/api/clases', routes_1.ClasesRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
